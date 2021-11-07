import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-render-node',
  templateUrl: './render-node.component.html',
  styleUrls: ['./render-node.component.css'],
})
export class RenderNodeComponent implements OnInit {
  @Input() node;
  editForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.editForm = this.node.form;
    console.log(this.node.form);
  }
}
