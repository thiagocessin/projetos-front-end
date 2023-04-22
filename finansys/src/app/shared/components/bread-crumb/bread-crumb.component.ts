import { Component, Input, OnInit } from '@angular/core';

interface BreadCrumbItem{
  text:string;
  link?:string;
}


@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit{

  @Input() itens: Array<BreadCrumbItem> = []

  ngOnInit(): void {

  }

  isTheLastItem(item:BreadCrumbItem):boolean{

    const index = this.itens.indexOf(item)

    return (index +1) == this.itens.length
  }


}
