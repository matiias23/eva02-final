import { Component, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { CrudService } from './services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from './models/message';


export interface Form {
  id?:number;
  name: string;
  code: string;
  description: string;
}

const ELEMENT_DATA: Form[] = [

];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'evaluacion02';
  displayedColumns: string[] = ['code', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  items: any[] =[];
  data:any[] = [];
  message:Message | undefined;
  messageError: string | undefined;

  constructor(public dialog: MatDialog, private crudService: CrudService,
    private _snackBar: MatSnackBar,) { }

  openDialog(id=null): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: this.items.find(item => item.id === id)
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadItems();
    });
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.crudService.getAll().subscribe({
      next : items =>{
        this.items = items;
        this.dataSource = new MatTableDataSource(items);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  deleteItem(itemId: number) {
    this.crudService.deleteItem(itemId).subscribe({
      next : message =>{
        this.loadItems();
        this.openSnackBar('Elemento eliminado');
    },
    error: error => {
      this.closeAlert();
      this.loadItems();
      this.messageError = error.error.message;
      console.log(error);
    }
    });
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  closeAlert(){
    this.message = undefined;
  }
  closeAlertError(){
    this.messageError = undefined;
  }

}
