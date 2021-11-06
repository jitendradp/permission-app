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
      other: this.formBuilder.array([this.addOtherSkillFormGroup()]),
    });
    (<FormArray>this.personalForm.get('other')).push(
      this.addOtherSkillFormGroup()
    );
    (<FormArray>this.personalForm.get('other')).push(
      this.addOtherSkillFormGroup()
    );
    (<FormArray>this.personalForm.get('other')).push(
      this.addOtherSkillFormGroup()
    );
  }
  ngOnInit() {
    this.getControl();

    let firstNode: Node = {
      children: [],
      text: 'Sixth Node',
      form: this.getControl(3),
    };
    this.setForm();
    this.tree.push(firstNode);
  }

  addOtherSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['test', Validators.required],
      edit: [true, Validators.required],
      view: [true, Validators.required],
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

  public getControl(index: number = 0): FormGroup {
    let otherForm = this.personalForm.get('other') as FormArray;
    let formGroup = otherForm.at(index) as FormGroup;
    return formGroup;
  }

  setForm() {
    this.tree = [
      // {
      //   children: [
      //     {
      //       children: [
      //         {
      //           children: [],
      //           text: 'firstNode',
      //         },
      //         {
      //           children: [],
      //           text: 'firstNode',
      //         },
      //       ],
      //       text: 'firstNode',
      //     },
      //     {
      //       children: [],
      //       text: 'firstNode',
      //     },
      //   ],
      //   text: 'firstNode',
      // },
      {
        children: [],
        text: 'Second Node',
        form: this.getControl(0),
      },
      {
        children: [],
        text: 'Third Node',
        form: this.getControl(1),
      },
      {
        children: [],
        text: 'Fourth Node',
        form: this.getControl(2),
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
