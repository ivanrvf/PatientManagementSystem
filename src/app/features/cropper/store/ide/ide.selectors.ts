import { createFeatureSelector } from "@ngrx/store";
import { IdeState } from "./ide.reducer";



export const getIdeState =  createFeatureSelector<IdeState>('ide')

