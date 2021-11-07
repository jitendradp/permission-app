import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Node } from './../node.model';
@Component({
  selector: 'permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css'],
})
export class PermissionComponent implements OnInit {
  permissionForm: FormGroup;
  tree: Node[] = [];

  constructor(public formBuilder: FormBuilder) {
    // Initilize permissionForm, Created firstName, LastName, roleName as textfield and created permissions formArray, permission form array will contain form group which contain permission details.
    this.permissionForm = this.formBuilder.group({
      firstName: ['Jitendra', [Validators.required, Validators.minLength(2)]],
      lastName: ['Prajapati', [Validators.required, Validators.minLength(2)]],
      roleName: ['Helper Mode', [Validators.required]],
      permissions: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    // Insert first permission
    // this.addPermissionControl(0);
    // Create tree element based on our requirements
    // In each node we have 2 field, text and children.
    // text: Name of node
    // children: If node has children then It will contain same node permission. we can add infinit No. of children
    this.createTreeNode();

    // Get permission form array to add form group to each node in 'tree'
    let permission = <FormArray>this.permissionForm.get('permissions');
    // Set permission form group to each node.
    this.setPermission(this.tree, permission);

    // subscribe valueChange event so when ever user change something we get notified.
    this.permissionForm.valueChanges.subscribe((form: any) => {
      console.log(
        this.permissionForm.valid,
        'vlidate form',
        this.permissionForm
      );
    });
  }

  /**
   * creating form group for permission
   * Name: name of node/permission
   * edit: True/False if user has permission for edit
   * view: True/False if user has permission for view
   * permissions: FormGroup if this node has more children
   */
  createPermissionFormGroup(nodeText): FormGroup {
    return this.formBuilder.group({
      name: [nodeText, Validators.required],
      edit: [true, Validators.required],
      view: [true, Validators.required],
      permissions: this.formBuilder.array([]),
    });
  }

  /**
   * setPermission will create form group for each node and assign form group to each 'tree' node so while rendering we can use each form group element. I have used recusive function to create and set formgroup for each inner node.
   */
  setPermission(tree: Node[], permission) {
    tree.forEach((tNode: Node, index: number) => {
      // If tree node has children then we create permission form group and add it and call setPermission again to add permission in children node.
      if (tNode.children.length > 0) {
        permission.push(this.createPermissionFormGroup(tNode.text));
        let innerGroup = permission.at(index) as FormGroup;
        this.setPermission(tNode.children, innerGroup.get('permissions'));
      } else {
        // Created permission form group for node and added in tree node
        permission.push(this.createPermissionFormGroup(tNode.text));
        const formLenght = permission.length - 1;
        let innerGroup = permission.at(formLenght) as FormGroup;
        tNode.form = innerGroup;
      }
    });
  }

  /**
   * Defined tree, created first node with 2 inner child, and rest node has one level child.
   */
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

  // On submit form get all from form
  onSubmit() {
    console.log('submit');
    console.log('form', this.permissionForm.value);
  }
}
