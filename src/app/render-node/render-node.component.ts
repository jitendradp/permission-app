import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-render-node',
  templateUrl: './render-node.component.html',
  styleUrls: ['./render-node.component.css'],
})
export class RenderNodeComponent implements OnInit {
  @Input() node;

  constructor() {}

  ngOnInit() {}
}
