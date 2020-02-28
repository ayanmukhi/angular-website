import { AbstractControl } from "@angular/forms";
import { RegisterComponent } from "../register/register.component";

export function emailValidator ( control: AbstractControl): {[key:string]: any} | null {
    const valid = /(\S+@\S+)|()/.test(control.value);
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

export function nameFirstValidator ( control: AbstractControl): {[key:string]: any} | null {
    const valid = /^[a-zA-Z ]*$/.test(control.value);
    return valid ? null : { 'value': {value: true}};
}

export function rolValidator( control: AbstractControl): {[key:string]:any} | null {
    const valid = /^[0-9]*$/.test(control.value);
    return valid ? null : { 'value': {value: true}};
}

export function percValidator ( control: AbstractControl) {
    let data = control.value;
    let valid = false;
    let num = parseFloat(data);
    if(( /^[0-9]*((.){1}([0-9]+)|())$/.test(data)) && (num <= 100)) {
        valid = true;
    }
    return valid ? null : { 'value': {value: true}};
}

export function phoneValidator ( control: AbstractControl ): {[key:string]:any} | null {
    const valid = /^[0-9]{1,9}$/.test(control.value);
    return valid ? null : { 'value': {value: true}};
}