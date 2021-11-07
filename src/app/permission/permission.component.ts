import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Node } from './../node.model';
@Component({
  selector: 'permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css'],
})
export class PermissionComponent implements OnInit {
  personalForm: FormGroup;
  tree: Node[] = [];

  constructor(public formBuilder: FormBuilder) {
    this.personalForm = this.formBuilder.group({
      firstName: ['Jitendra', [Validators.required, Validators.minLength(2)]],
      lastName: ['Prajapati', [Validators.required, Validators.minLength(2)]],
      roleName: ['Helper Mode', [Validators.required]],
      permissions: this.formBuilder.array([]),
    });
  }
  ngOnInit() {
    this.addPermissionControl();
    this.createTreeNode();
    let permission = <FormArray>this.personalForm.get('permissions');
    this.setFormData(this.tree, permission);

    this.personalForm.valueChanges.subscribe((form: any) => {
      console.log(this.personalForm.valid, 'vlidate form', this.personalForm);
    });
  }

  addOtherSkillFormGroup(nodeText): FormGroup {
    return this.formBuilder.group({
      name: [nodeText, Validators.required],
      edit: [true, Validators.required],
      view: [true, Validators.required],
      permissions: this.formBuilder.array([]),
    });
  }

  setFormData(tree: Node[], permission) {
    tree.forEach((tNode: Node, index: number) => {
      if (tNode.children.length > 0) {
        permission.push(this.addOtherSkillFormGroup(tNode.text));
        let innerGroup = permission.at(index) as FormGroup;
        this.setFormData(tNode.children, innerGroup.get('permissions'));
      } else {
        permission.push(this.addOtherSkillFormGroup(tNode.text));
        const formLenght = permission.length - 1;
        let innerGroup = permission.at(formLenght) as FormGroup;
        tNode.form = innerGroup;
      }
    });
  }

  public addPermissionControl(index: number = 0): FormGroup {
    let permissions = this.personalForm.get('permissions') as FormArray;
    let formGroup = permissions.at(index) as FormGroup;
    return formGroup;
  }

  createTreeNode() {
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
        children: [],
        text: 'Helper',
      },
    ];
  }

  onSubmit() {
    console.log('submit');
    console.log('form', this.personalForm.value);
  }
}
