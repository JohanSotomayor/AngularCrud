import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/Services/tarjeta.service';


@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
ListTarjeta: any[]= [];
accion="Agregar";
form: FormGroup;
id: number | undefined;
  constructor(private fb:FormBuilder, 
    private toastr: ToastrService, 
    private tarjetaservice: TarjetaService) {
    this.form= this.fb.group({
      nombre: ["", Validators.required],
      numero: ["", [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      fecha: ["", Validators.required],
      cvv:["", [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    })

   }

  ngOnInit(): void {
  this.obtenerTarjetas();
  }

 obtenerTarjetas(){
   this.tarjetaservice.GetLista().subscribe(data => {
    console.log(data);
    this.ListTarjeta=data;
   }, error =>{
     console.log(error);
   })
}

agregar(){
  // console.log(this.form)

  const infoTarjetas: any={
    nombre: this.form.get("nombre")?.value,
    numero: this.form.get("numero")?.value,
    fecha: this.form.get("fecha")?.value.replace("20","").replace("-","/"),
    cvv: this.form.get("cvv")?.value,
  }
  if(this.id== undefined){
this.tarjetaservice.PostLista(infoTarjetas).subscribe(data =>{
  this.toastr.success("Agregaste una tarjeta","Tarjeta Registrada")
  this.obtenerTarjetas();
  this.form.reset()

}, error=>{
  this.toastr.error("No se pudo realizar la accion","Upps Error")
  console.log(error)
})
  }
else{
  infoTarjetas.id=this.id
 this.tarjetaservice.PutLista(this.id,infoTarjetas).subscribe(data =>{
  this.form.reset();
  this.accion="Agregar";
  this.id=undefined;
  this.toastr.info("se ha actualizado la informacion","Se ha actualizado")
    this.obtenerTarjetas();
},error=>{
  console.log(error)
} ) 
}
}

borrarTC(index:number){
  this.tarjetaservice.DeleteLista(index).subscribe(data =>{
// this.ListTarjeta.splice(index,1)
this.toastr.error("Eliminaste una tarjeta", "Tarjeta Elminada")
this.obtenerTarjetas();
}, error=>{
    console.log(error);
  })


}
editarTC(tarjeta: any){
  console.log(tarjeta);
  this.accion="editar"
  this.id= tarjeta.id;

  this.form.patchValue({
    nombre:tarjeta.nombre,
    numero:tarjeta.numero,
    fecha:tarjeta.fecha,
    cvv:tarjeta.cvv,
  })

}

}
