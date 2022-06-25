import { StatusModule } from "./status/status.module";
import { TaskModule } from "./tasks/task.module";
import { TransitionModule } from "./transitions/transition.module";
import { UserModule } from "./users/user.module";

const modules = [
	TaskModule,
	UserModule,
	StatusModule,
	TransitionModule,
]

export default modules;