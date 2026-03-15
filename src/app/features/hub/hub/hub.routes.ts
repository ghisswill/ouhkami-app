import { Routes } from "@angular/router";
import { Layout } from "../components/layout/layout";
import { Hub } from "./hub";

export const HUB_ROUTES : Routes = [
    {
        path: '', component: Layout,
        children: [
            {path: '', component: Hub}
        ]
    }
];