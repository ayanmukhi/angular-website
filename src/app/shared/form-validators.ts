import { AbstractControl } from "@angular/forms";

export function emailValidator ( control: AbstractControl): {[key:string]: any} | null {
    const valid = /\S+@\S+/.test(control.value);
    console.log(valid);
    return valid ? null : { 'value': {value: true}};
}

export function passwordValidator ( control: AbstractControl): {[key:string]: any} | null {
    var valid = false;
    if( /(?=[a-z])/.test(control.value) && /(?=[0-9])/.test(control.value) &&  /(?=[A-Z])/.test(control.value)) {
        valid = true;
    }
    console.log(valid);
    return valid ? null : { 'value': {value: true}};
}