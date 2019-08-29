import { decode } from 'jwt-decode';
import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

    public static get token_prefix(): string {
        return "study ";
    }
    public static years(year: any): string[] {

        let arr = ["FirstYear", "SecondYear", "ThirdYear", "FourthYear", "FifthYear"];
        return arr.slice(0, year);
    }
}

