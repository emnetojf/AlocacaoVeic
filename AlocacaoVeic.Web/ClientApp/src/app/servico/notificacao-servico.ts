import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})

export class NotificacaoServico {
  constructor(private toastr: ToastrService) {

  }

  showSucesso(msg, titulo) {
    this.toastr.success(msg, titulo);
  }

  showErro(msg, titulo) {
    this.toastr.error(msg, titulo);
  }

  showAtencao(msg, titulo) {
    this.toastr.warning(msg, titulo);
  }

  showInfo(msg, titulo) {
    this.toastr.info(msg, titulo);
  }

}
