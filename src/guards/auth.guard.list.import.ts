import { IsAdminCanActivateChildGuard } from "./admin/admin.can.active.child.guards";
import { IsAdminCanActivateGuard } from "./admin/admin.can.active.guards";
import { IsAdminCanLoadGuard } from "./admin/admin.can.load.guards";
import { AdminCanMatchGuard } from "./admin/admin.can.match.guards";
import { AuthGuard } from "./auth.guards";

export const IMPORTS_GUARDS = [
    IsAdminCanActivateChildGuard,
    IsAdminCanLoadGuard,
    AuthGuard,
    AdminCanMatchGuard,
    IsAdminCanActivateGuard
    
];