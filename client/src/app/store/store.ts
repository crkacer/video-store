import { StoreModule } from "@ngrx/store";
import { authReducer } from "./auth";

export default StoreModule.forRoot({
    auth: authReducer
});