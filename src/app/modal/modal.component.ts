import { Component, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from '../services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '../models/message';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  form = {
    id:'',
    code: '',
    name: '',
    description: ''
  };
  message:Message | undefined;
  messageError: string | undefined;
  modalErrors: any | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private crudService: CrudService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {

    console.log(this.data);
    if (this.data){
      this.form=this.data
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createItem(): void {

    if(this.form.id){
      this.crudService.updateItem(this.data.id, this.form).subscribe({
        next: message => {
          this.openSnackBar('Elemento actualiado');
          this.closeDialog();
          this.message = message;
        },
        error: error => {
          this.modalErrors = error.error.errors;
          console.log(error);
        }
      });
    }else{
      this.crudService.createItem(this.form).subscribe({
        next: message => {
          this.openSnackBar('Elemento actualiado');
          this.closeDialog();
          this.message = message;
        },
        error: error => {
          this.modalErrors = error.error.errors;
          console.log(error);
        }
      });
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}
