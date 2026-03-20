import { Routes } from "@angular/router";
import { Layout } from "../../hub/components/layout/layout";
import { Todo } from "./todo";

export const TODO_ROUTES: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {path: '', component: Todo}
        ]
    }
];