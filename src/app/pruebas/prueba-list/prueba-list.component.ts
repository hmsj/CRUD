import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Prueba } from 'src/app/app.component';
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-prueba-list',
  templateUrl: './prueba-list.component.html',
  styleUrls: ['./prueba-list.component.scss']
})
export class PruebaListComponent implements OnInit {
  modalRef: BsModalRef;
  prueba: Prueba = new Prueba();
  editPrueba: Prueba = new Prueba();
  pruebas: any;
  id= { 'id' : ''};
  enableBtnEdit = false;

  constructor(
    private modalService: BsModalService,
    private pruebaService: PruebaService
  ) { }

  ngOnInit() {
    this.getPruebas();
  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalEdit(template: TemplateRef<any>, prueba) {
    this.modalRef = this.modalService.show(template);
    this.editPrueba = prueba;
  }

  openModalDelete(template: TemplateRef<any>, id) {
    this.id.id = id;
    this.modalRef = this.modalService.show(template);
    
  }

  getPruebas() {
    this.pruebaService.getAll().subscribe(data => {
      this.pruebas = data;
    }, error => {
      console.log(error);
    })
  }

  enableBtn(): boolean {
    if(this.prueba.numero && this.prueba.numero!==0 && this.prueba.nombre) {
      return true;
    }
    return false;
  }

  onSave() {
    this.pruebaService.post(this.prueba).subscribe(data => {
      this.getPruebas();
      this.modalRef.hide();
      this.prueba.numero = 0;
      this.prueba.nombre = '';
      this.prueba.descripcion = '';
      this.prueba.zona = '';
    }, error => {
      console.log(error);
    })
  }

  onUpdate() {
    this.pruebaService.update(this.editPrueba).subscribe(res => {
      this.getPruebas()
      this.modalRef.hide();
      this.enableBtnEdit = false;
    }, error => {
      console.log(error);
    })
  }

  deletePrueba() {
    this.pruebaService.delete(this.id).subscribe(res => {
      this.getPruebas()
      this.modalRef.hide();
    }, error => {
      console.log(error);
    })
  }

}
