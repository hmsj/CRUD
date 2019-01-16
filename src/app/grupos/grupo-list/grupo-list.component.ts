import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GrupoService } from 'src/app/services/grupo.service';
import { Grupo } from 'src/app/app.component';



@Component({
  selector: 'app-grupo-list',
  templateUrl: './grupo-list.component.html',
  styleUrls: ['./grupo-list.component.scss']
})
export class GrupoListComponent implements OnInit {
  modalRef: BsModalRef;
  grupos: any;
  grupo: Grupo = new Grupo();
  editGrupo: Grupo = new Grupo();
  id= { 'id' : ''};
  enableBtnEdit = false;

  constructor(
    private modalService: BsModalService,
    private grupoService: GrupoService
  ) { }

  ngOnInit() {
    this.getGrupos();
  }

  getGrupos() {
    this.grupoService.getAll().subscribe(data => {
      this.grupos = data;
    }, error => {
      console.log(error);
    })
  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalEdit(template: TemplateRef<any>, grupo) {
    this.modalRef = this.modalService.show(template);
    this.editGrupo = grupo;
  }

  openModalDelete(template: TemplateRef<any>, id) {
    this.id.id = id;
    this.modalRef = this.modalService.show(template);
    
  }

  enableBtn(): boolean {
    if(this.grupo.numero && this.grupo.numero>0 && this.grupo.nombre) {
      return true;
    }
    return false;
  }

  onSave() {
    this.grupo.puntuacionTotal = 0;
    this.grupoService.post(this.grupo).subscribe(data => {
      this.getGrupos();
      this.modalRef.hide();
      this.grupo.numero = 0;
      this.grupo.nombre = '';
      this.grupo.puntuacionTotal = 0;
    }, error => {
      console.log(error);
    })
  }

  onUpdate() {
    this.grupoService.update(this.editGrupo).subscribe(res => {
      this.getGrupos()
      this.modalRef.hide();
      this.enableBtnEdit = false;
    }, error => {
      console.log(error);
    })
  }

  deleteGrupo() {
    this.grupoService.delete(this.id).subscribe(res => {
      this.getGrupos()
      this.modalRef.hide();
    }, error => {
      console.log(error);
    })
  }
}
