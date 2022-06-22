import { StatusModule } from "./status/status.module";
import { TodoModule } from "./todos/todo.module";
import { TransitionModule } from "./transitions/transition.module";
import { UserModule } from "./users/user.module";

const modules = [
	TodoModule,
	UserModule,
	StatusModule,
	TransitionModule,
]

export default modules;