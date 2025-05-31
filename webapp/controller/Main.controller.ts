/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import Event from "sap/ui/base/Event";
import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace at.hochschule.burgenland.inenpibm.controller
 */
export default class Main extends Controller {

    public onInit(): void {

    }

    public onItemPress(event: Event): void {
        const employeeIdx = (event.getParameter("listItem").getBindingContext("employeeModel").getPath() as string).split("/").pop();

        (this.getOwnerComponent() as Component).getRouter().navTo("RouteDetail", {employeeIdx: employeeIdx}, {}, false);
    }

    public addEmployee(): void {
        const model = this.getOwnerComponent()?.getModel("employeeModel") as JSONModel;
        const data = model.getData() as any[];

        data.push({firstName: "", lastName: "", age: 0, role: ""});

        model.setData(data);

        (this.getOwnerComponent() as Component).getRouter().navTo("RouteDetail", {employeeIdx: data.length - 1}, {}, false);
    }
}