import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NodeComponent } from './node/node.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent, NodeComponent, TreeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
