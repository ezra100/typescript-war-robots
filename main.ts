enum TaskType { DestroyEnemyBots, Wins, BeaconCapturing }
enum Prize {
    Magnum,
    Blaze_Natasha,
    Aphid,
    Trebuchet,
    Emerald_Griffin,
    Trident,
    Ancile,
    Carnage,
    Orkan,
    Shocktrain,
    Bulgasari
}
class SingleTask {
    type: TaskType;
    amount: number;
    public constructor(init?: Partial<SingleTask>) {
        Object.assign(this, init);
    }
    public getCompletionTime(): number {
        return UserPace.pace[this.type] * this.amount;
    }
}


class UserPace {
    static pace: number[] = [];
    static init() {
        UserPace.pace[TaskType.BeaconCapturing] = 8 / 5;
        UserPace.pace[TaskType.Wins] = 15;
        UserPace.pace[TaskType.DestroyEnemyBots] = 8 / 5;
    }

    /**
     * 
     * @param battleTime 
     * @param win percentage 0-100
     * @param kills 
     * @param caps 
     */
    static setPaceBasic(battleTime: number, win: number, kills: number, caps: number) {
        UserPace.pace[TaskType.BeaconCapturing] = battleTime / caps;
        UserPace.pace[TaskType.Wins] = battleTime * (100 / win);
        UserPace.pace[TaskType.DestroyEnemyBots] = battleTime / kills;
    }
    static setPaceAdvanced(win: number, kills: number, caps: number) {
        UserPace.pace[TaskType.BeaconCapturing] = caps;
        UserPace.pace[TaskType.Wins] = win;
        UserPace.pace[TaskType.DestroyEnemyBots] = kills;
    }
}
//UserPace.init();

class TaskGroup {
    mainPrize: Prize;
    secondaryPrize: number; // amount of silver in K's
    tasks: SingleTask[];
    public calaculateTime(): number {
        var counter: number = 0;
        for (let task of this.tasks) {
            counter += task.getCompletionTime();
        }
        return counter;
    }
    public constructor(init?: Partial<TaskGroup>) {
        Object.assign(this, init);
    }
}
var taskList: TaskGroup[] = [
    new TaskGroup({
        mainPrize: Prize.Magnum,
        secondaryPrize: 10,
        tasks: [
            new SingleTask({ type: TaskType.Wins, amount: 2 }),
            new SingleTask({ type: TaskType.Wins, amount: 2 }),
            new SingleTask({ type: TaskType.Wins, amount: 2 }),
            new SingleTask({ type: TaskType.Wins, amount: 2 }),
            new SingleTask({ type: TaskType.Wins, amount: 7 })
        ]
    }), new TaskGroup({
        mainPrize: Prize.Blaze_Natasha,
        secondaryPrize: 25,
        tasks: [
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 7 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 7 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 7 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 7 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 12 })]
    }), new TaskGroup({
        mainPrize: Prize.Aphid,
        secondaryPrize: 50,
        tasks: [
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 8 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 8 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 8 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 8 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 13 })]
    }), new TaskGroup({
        mainPrize: Prize.Trebuchet,
        secondaryPrize: 75,
        tasks: [
            new SingleTask({ type: TaskType.Wins, amount: 6 }),
            new SingleTask({ type: TaskType.Wins, amount: 6 }),
            new SingleTask({ type: TaskType.Wins, amount: 6 }),
            new SingleTask({ type: TaskType.Wins, amount: 6 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 28 })]
    }), new TaskGroup({
        mainPrize: Prize.Emerald_Griffin,
        secondaryPrize: 100,
        tasks: [
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 28 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 28 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 28 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 23 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 23 })]
    }), new TaskGroup({
        mainPrize: Prize.Trident,
        secondaryPrize: 125,
        tasks: [
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 23 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 23 }),
            new SingleTask({ type: TaskType.Wins, amount: 9 }),
            new SingleTask({ type: TaskType.Wins, amount: 9 }),
            new SingleTask({ type: TaskType.Wins, amount: 9 })]
    }), new TaskGroup({
        mainPrize: Prize.Ancile,
        secondaryPrize: 150,
        tasks: [
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 46 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 46 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 46 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 34 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 34 })]
    }), new TaskGroup({
        mainPrize: Prize.Carnage,
        secondaryPrize: 200,
        tasks: [
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 34 }),
            new SingleTask({ type: TaskType.Wins, amount: 13 }),
            new SingleTask({ type: TaskType.Wins, amount: 13 }),
            new SingleTask({ type: TaskType.Wins, amount: 13 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 60 })]
    }), new TaskGroup({
        mainPrize: Prize.Orkan,
        secondaryPrize: 250,
        tasks: [
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 60 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 60 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 45 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 45 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 45 })]
    }), new TaskGroup({
        mainPrize: Prize.Shocktrain,
        secondaryPrize: 300,
        tasks: [
            new SingleTask({ type: TaskType.Wins, amount: 17 }),
            new SingleTask({ type: TaskType.Wins, amount: 17 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 73 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 73 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 58 })]
    }), new TaskGroup({
        mainPrize: Prize.Shocktrain,
        secondaryPrize: 400,
        tasks: [
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 58 }),
            new SingleTask({ type: TaskType.Wins, amount: 21 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 86 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 65 }),
            new SingleTask({ type: TaskType.Wins, amount: 21 })]
    }), new TaskGroup({
        mainPrize: Prize.Bulgasari,
        secondaryPrize: 500,
        tasks: [
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 106 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 85 }),
            new SingleTask({ type: TaskType.Wins, amount: 27 }),
            new SingleTask({ type: TaskType.DestroyEnemyBots, amount: 106 }),
            new SingleTask({ type: TaskType.BeaconCapturing, amount: 85 })]
    })
];



function createTimeTable(): JQuery<HTMLElement> {
    var table = $("<table/>");
    $(table).addClass("container").attr("id","data-table");
    let row = $("<tr/>");
    row.append($("<th/>").text("Task"));
    row.append($("<th/>").text("Time for Task"));
    row.append($("<th/>").text("Cumulative time"));
    table.append(row);
    var counter: number = 0;
    for (let taskGroup of taskList) {
        let time = taskGroup.calaculateTime();
        counter += time;

        let row = $("<tr/>");
        let name = Prize[taskGroup.mainPrize].replace("_", " ");
        row.append($("<td/>").text(name));
        row.append($("<td/>").html(minutesToString(time)));
        row.append($("<td/>").html(minutesToString(counter)));
        table.append(row);
    }
    return table;
}
console.log(createTimeTable());

function sumTypes(): number[] {
    var arr: number[] = [];
    arr[TaskType.BeaconCapturing] = 0;
    arr[TaskType.Wins] = 0;
    arr[TaskType.DestroyEnemyBots] = 0;
    for (let task of taskList) {
        for (let singleTask of task.tasks) {
            arr[singleTask.type] += singleTask.amount;
        }
    }
    console.log(`${TaskType.BeaconCapturing} : ${arr[TaskType.BeaconCapturing]}`);
    console.log(`${TaskType.DestroyEnemyBots} : ${arr[TaskType.DestroyEnemyBots]}`);
    console.log(`${TaskType.Wins} : ${arr[TaskType.Wins]}`);

    return arr;
}

console.log(`sum of types:\n ${JSON.stringify(sumTypes())}`);

function calculate() {
    setPace();
    var table = createTimeTable();
    if ($("#data-table").length) {
        $("#data-table").replaceWith(table);
    } else {
        $(".page-content").append(table);
    }
}

function setPace() {
    if ($("#basic-panel").hasClass("is-active")) {
        let battleTime = parseInt((String)($("#battle-length").val()));
        let winningPercentage = parseInt((String)($("#winning-percentage").val()).replace("%", ""));
        let beaconCaps = parseInt((String)($("#beacon-caps").val()));
        let kills = parseInt((String)($("#battle-kills").val()));
        UserPace.setPaceBasic(battleTime, winningPercentage, kills, beaconCaps);
    } else {
        let winingTime = parseInt((String)($("#advanced-win").val()));
        let beaconCaps = parseInt((String)($("#advanced-beacon").val()));
        let kills = parseInt((String)($("#advanced-kills").val()));
        UserPace.setPaceAdvanced(winingTime, kills, beaconCaps);
    }
}

$(document).ready(function () {
    $("#calculate").click(calculate);
});

function minutesToHHMM(minutes: number): string {
    if (minutes < 60) {
        return minutes.toFixed(0).toString();
    }
    let hours = (minutes / 60).toFixed(0);
    let subMin = (minutes % 60).toFixed(0);
    if (subMin.length < 2) {
        subMin = "0" + subMin;
    }
    return `${hours}:${subMin}`;
}

function minutesToString(minutes: number): string {
    if (minutes < 60) {
        return "<b>" + minutes + "</b>" + " Minutes";
    }
    let hours = (minutes / 60).toFixed(0);
    let subMin = (minutes % 60).toFixed(0);

    return `<b>${hours}</b> Hours and <b>${subMin}</b> Minutes`;
}