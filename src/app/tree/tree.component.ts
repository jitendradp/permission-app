import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Node } from './../node.model';
@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {
  personalForm: FormGroup;
  tree: Node[] = [];

  constructor(public formBuilder: FormBuilder) {
    this.personalForm = this.formBuilder.group({
      firstName: ['firstName', [Validators.required, Validators.minLength(2)]],
      lastName: ['lastName', [Validators.required, Validators.minLength(2)]],
      address: ['roleName', [Validators.required]],
      permissions: this.formBuilder.array([]),
    });
  }
  ngOnInit() {
    this.getControl();
    this.setForm();
    let otherForm = <FormArray>this.personalForm.get('permissions');
    this.setFormData(this.tree, otherForm);
    this.personalForm.valueChanges.subscribe((form: any) => {
      console.log(this.personalForm.valid, 'vlidate form', this.personalForm);
    });
  }

  addOtherSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['test', Validators.required],
      edit: [true, Validators.required],
      view: [true, Validators.required],
      permissions: this.formBuilder.array([]),
    });
  }
  addNodeTo() {
    (<FormArray>this.personalForm.get('permissions')).push(
      this.addOtherSkillFormGroup()
    );
  }

  setFormData(tree, otherForm) {
    tree.forEach((tNode, index) => {
      if (tNode.children.length > 0) {
        otherForm.push(this.addOtherSkillFormGroup());
        let innerGroup = otherForm.at(index) as FormGroup;
        this.setFormData(tNode.children, innerGroup.get('permissions'));
      } else {
        otherForm.push(this.addOtherSkillFormGroup());
        const formLenght = otherForm.length - 1;
        let innerGroup = otherForm.at(formLenght) as FormGroup;
        tNode.form = innerGroup;
      }
    });
  }

  public getControl(index: number = 0): FormGroup {
    let otherForm = this.personalForm.get('permissions') as FormArray;
    let formGroup = otherForm.at(index) as FormGroup;
    return formGroup;
  }

  setForm() {
    this.tree = [
      {
        children: [
          {
            children: [],
            text: 'Owner',
          },
          {
            children: [],
            text: 'Co-Owner',
          },
        ],
        text: 'Admin',
      },
      {
        children: [],
        text: 'Head Mode',
      },
      {
        children: [],
        text: 'Mode',
      },
      {
        children: [
          // {
          //   children: [
          //     {
          //       children: [],
          //       text: 'Owner32323',
          //     },
          //   ],
          //   text: 'Owner2',
          // },
        ],
        text: 'Helper',
      },
    ];
  }
}
