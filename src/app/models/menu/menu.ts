import { MenuItem } from "primeng/api";

export interface NavMenu extends MenuItem {

    exact?: boolean;

    admin?: boolean;

    active?: boolean;

}