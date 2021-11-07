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
      firstName: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(8)],
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(8)],
      ],
      address: ['', [Validators.required]],
      other: this.formBuilder.array([]),
    });
    // (<FormArray>this.personalForm.get('other')).push(
    //   this.addOtherSkillFormGroup()
    // );
    // (<FormArray>this.personalForm.get('other')).push(
    //   this.addOtherSkillFormGroup()
    // );
    // (<FormArray>this.personalForm.get('other')).push(
    //   this.addOtherSkillFormGroup()
    // );
  }
  ngOnInit() {
    this.getControl();

    let firstNode: Node = {
      children: [],
      text: 'Sixth Node',
      // form: this.getControl(3),
    };

    // this.addOtherSkillFormGroup()
    this.setForm();
    this.tree.push(firstNode);
    let otherForm = <FormArray>this.personalForm.get('other');
    this.setFormData(this.tree, otherForm);
    // console.log('jit', this.personalForm);
    this.personalForm.valueChanges.subscribe((form: any) => {
      console.log({ form });
    });
    // console.log(this.tree);
  }

  addOtherSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['test', Validators.required],
      edit: [true, Validators.required],
      view: [true, Validators.required],
      other: this.formBuilder.array([]),
    });
  }
  addNodeTo() {
    // this.addOtherSkillFormGroup();
    (<FormArray>this.personalForm.get('other')).push(
      this.addOtherSkillFormGroup()
    );
    // let newNode: Node = {
    //   children: [],
    //   text: 'newNode',
    // };
    // this.tree.push(newNode);
  }

  setFormData(tree, otherForm) {
    tree.forEach((tNode, index) => {
      if (tNode.children.length > 0) {
        otherForm.push(this.addOtherSkillFormGroup());
        let innerGroup = otherForm.at(index) as FormGroup;

        this.setFormData(tNode.children, innerGroup.get('other'));
      } else {
        // otherForm.get('form');

        otherForm.push(this.addOtherSkillFormGroup());

        const formLenght = otherForm.length - 1;
        console.log(formLenght);
        let innerGroup = otherForm.at(formLenght) as FormGroup;
        // this.getControl(index);
        // (<FormArray>this.personalForm.get('other')).splice(1,0,)
        tNode['form'] = innerGroup;
      }
    });
  }

  public getControl(index: number = 0): FormGroup {
    let otherForm = this.personalForm.get('other') as FormArray;
    let formGroup = otherForm.at(index) as FormGroup;
    return formGroup;
  }

  setForm() {
    this.tree = [
      {
        children: [
          {
            children: [],
            text: 'firstNode 1',
          },
          {
            children: [],
            text: 'firstNode 2',
          },
        ],
        text: 'firstNode',
      },
      {
        children: [],
        text: 'Second Node',
        // form: this.getControl(0),
      },
      {
        children: [],
        text: 'Third Node',
        // form: this.getControl(1),
      },
      {
        children: [],
        text: 'Fourth Node',
        // form: this.getControl(2),
      },
      // {
      //   children: [
      //     {
      //       children: [],
      //       text: 'firstNode',
      //     },
      //     {
      //       children: [],
      //       text: 'firstNode',
      //     },
      //     {
      //       children: [],
      //       text: 'firstNode',
      //     },
      //     {
      //       children: [],
      //       text: 'firstNode',
      //     },
      //   ],
      //   text: 'Fifth child',
      // },
    ];
  }
}
