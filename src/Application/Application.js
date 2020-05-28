// signature promo-cli <command> <flags> <entity> <options> <arguments>

// CommandController
// FlagController
// OptionController

// CommandController -> checkFlags -> checkEntity -> checkOptions and checkArguments |
//      |     <-----         <------          <------         <-------------------- <-

// cli <command> [frontend/backend]]<flag> <entity> <options> <arguments>
// 1 example
// cli init<command> PromoProject<argument>
// 2 example
// cli generate(g)<command> --frontend(-f)<flag> page<entity> Main --route(-r)<option> '/'<argument>
// long version: cli generate --frontend page Main --route '/'
// short version: cli g -f page Main -r '/'
// 3 example
// cli build<command> fonts<entity>
// 4 example
// cli generate -f page Main --add MainButton
// 5 example
// cli generate-add<command> MainButton --target(-t) Main

// examples generate command:
// cli g -f page Main
// cli g -f component Modal
// cli g -f common Button
// cli g -f service Api
// cli g -f utils mediaWidth
// cli g -b model User
// cli g -b repository UserRepository //хотя это спорно, можно навреное и генерировать сразу с моделью //ну да, так даже лучше будет
// cli g -b domain User
// cli g -b controller UserController
// cli g -b dto CreateUserRequest


// cli frontend <command> <entity> <options> <arguments>
// cli frontend generate route "/user" User
// cli init

// cli (initial Application) Application.start()
// cli frontend/backend is Application.start(frontend/backend) -> frontend(backend).controller
// cli frontend

class Application {
    start() {
        console.log('start');
    }
}

module.exports = Application;
