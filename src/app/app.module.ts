import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NodeComponent } from './node/node.component';
import { TreeComponent } from './tree/tree.component';
import { RenderNodeComponent } from './render-node/render-node.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    NodeComponent,
    TreeComponent,
    RenderNodeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
