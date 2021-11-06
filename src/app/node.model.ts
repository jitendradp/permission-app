import { FormGroup } from '@angular/forms';

export class Node {
  children: Node[];
  text: string;
  form?: FormGroup;
}
