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

  public getControl(index: number = 0) {
    let otherForm = this.personalForm.get('other') as FormArray;
    let formGroup = otherForm.at(index);
    console.log(formGroup);
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
      },
      {
        children: [],
        text: 'Third Node',
      },
      {
        children: [],
        text: 'Fourth Node',
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
