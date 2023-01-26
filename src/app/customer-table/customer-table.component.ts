import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from "@angular/core";
import { Customer, CustomerAction } from "../core/models/customer";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { GlobalState } from "../store/states/global.state";
import { Store, select } from "@ngrx/store";
import {
  selectAllCustomer,
  selectCustomerTotal,
  selectCustomerError,
  selectCustomerLoading,
} from "../store/selectors/customer.selectors";
import {
  loadingCustomers,
} from "../store/actions/customer.actions";
import { MatPaginator } from "@angular/material/paginator";
import { Observable, merge, Subject, Subscription } from "rxjs";
import { tap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { ModalService } from "../services/modal-service/modal-service.service";
import { MyModalComponent } from "../shared/my-modal.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-customer-table",
  templateUrl: "./customer-table.component.html",
  styleUrls: ["./customer-table.component.scss"],
})
export class CustomerTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public displayedColumns: string[] = [
    "id",
    "role",
    "firstName",
    "lastName",
    "amount",
    "action"
  ];
  public dataSource: MatTableDataSource<Customer>;
  public customerTotal: number;
  public noData: Customer[] = [<Customer>{}];
  public loading: boolean;
  public error$: Observable<boolean>;
  public filterSubject = new Subject<string>();
  public defaultSort: Sort = { active: "role", direction: "asc" };

  private filter: string = "";
  private subscription: Subscription = new Subscription();
  public customer: Customer;

  constructor(public store: Store<GlobalState>, private modalService: ModalService, public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.store
      .pipe(select(selectAllCustomer))
      .subscribe((customers) => this.initializeData(customers));
    this.store
      .pipe(select(selectCustomerTotal))
      .subscribe((total) => (this.customerTotal = total));
    this.subscription.add(
      this.store.pipe(select(selectCustomerLoading)).subscribe((loading) => {
        if (loading) {
          this.dataSource = new MatTableDataSource(this.noData);
        }
        this.loading = loading;
      })
    );
    this.error$ = this.store.pipe(select(selectCustomerError));
  }

  public ngAfterViewInit(): void {
    this.loadCustomers();
    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      })
    );

    let sort$ = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 0))
    );

    this.subscription.add(
      merge(filter$, sort$, this.paginator.page)
        .pipe(tap(() => this.loadCustomers()))
        .subscribe()
    );
  }

  private loadCustomers(): void {
    this.store.dispatch(
      loadingCustomers({
        params: {
          filter: this.filter.toLocaleLowerCase(),
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize,
          sortDirection: this.sort.direction,
          sortField: this.sort.active,
        },
      })
    );
  }

  private initializeData(customers: Customer[]): void {
    this.dataSource = new MatTableDataSource(
      customers.length ? customers : this.noData
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public retry(): void {
    this.loadCustomers();
  }

  public openCustomer(row: Customer) {
    console.log("Here is the customer: ");
    console.log(row);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;
    this.dialog.open(DialogComponent, dialogConfig);
    
    /*const modalRef = this.modalService.open(MyModalComponent, row);

    modalRef.onResult().subscribe(
      closed => console.log('closed', closed),
      dismissed => console.log('dismissed', dismissed),
      () => console.log('completed')
    );*/
  }

  openDialog(act: string, obj: Customer) {
   
    //console.log(obj.action);
    //obj.action = action;
    const dataToSend: CustomerAction = {
      cust: obj,
      action: act
    }
   
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: dataToSend
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        console.log("Muna bwam");
        console.log(result);
        //this.addRowData(result.data);
      }else if(result.event == 'update'){
        console.log("Inside update");
        console.log(result);
        //this.updateRowData(result.data);
      }else if(result.event == 'delete'){
        //this.deleteRowData(result.data);
      }else if(result.event == 'show'){
        //this.deleteRowData(result.data);
      }
    });

  }

}
