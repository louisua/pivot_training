import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent {
//Declaration des variables
  title= 'Angular Calculator';
  version= 'v 1.0';
  output = null;
  operator: string;
  Value:number;
  Ans:number;
  newNumber:boolean;

 setOutput(outputString) : void{
       this.output = outputString;
       this.Ans =  this.Value;
     };

//Fonction pour reinitialiser la calculatrice
 clear() : void{
   this.output = null;
   this.operator = null;
   this.Value = null;
   this.Ans = null;
   this.newNumber = true;
 }

//Fonction pour faire les differents calcul avec les operateurs arithmetique definie
Calculate() : void {
     var opert=this.operator;
     switch (opert) {
          case('+'):
             this.Ans +=  this.Value;
             this.setOutput(String(this.Ans));
             this.Ans = parseFloat(this.output);
             this.Value=null;
             this.operator=null;
           break;
          case('-'):
             this.Ans -=  this.Value;
             this.setOutput(String(this.Ans));
             this.Ans = parseFloat(this.output);
             this.Value=null;
             this.operator=null;
           break;
          case('*'):
            this.Ans *=  this.Value;
            this.setOutput(String(this.Ans));
            this.Ans = parseFloat(this.output);
            this.Value=null;
            this.operator=null;
           break;
          case('/'):
            this.Ans /=  this.Value;
            this.setOutput(String(this.Ans));
            this.Ans = parseFloat(this.output);
            this.Value=null;
            this.operator=null;
           break;
         }
       }

//Fonction pour recuperer les valeurs numerique
OnClick(value): void {
    if(this.Value==null || this.newNumber){
    this.output = value;
    this.newNumber = false;
  }
  else if (value == "." && this.output.toString().indexOf(".") !== -1) {
  }
  else{
          this.output += String(value);
  }
  this.Value = parseFloat(this.output);
}

//Fonction pour recuperer l'operateur arithmetique
getOperator(op : string) : void{
if (this.Ans==null){
    this.Ans = this.Value;
}
this.operator = op;
this.newNumber=true;
this.Value = null;
  }

}
