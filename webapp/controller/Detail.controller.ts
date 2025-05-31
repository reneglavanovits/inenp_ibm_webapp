/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
import Event from "sap/ui/base/Event";
import MessageBox from "sap/m/MessageBox";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace at.hochschule.burgenland.inenpibm.controller
 */
export default class Detail extends Controller {

    public onInit(): void {
        (this.getOwnerComponent() as Component).getRouter().getRoute("RouteDetail")?.attachPatternMatched(this._onPatternMatched, this);
    }

    private _onPatternMatched(event: Event): void {
        const employeeIdx = event.getParameter("arguments").employeeIdx as string;

        this.getView()?.bindElement({
            path: `/${employeeIdx}`,
            model: "employeeModel"
        });
    }

    public deleteEmployee(): void {
        MessageBox.confirm("Do you really want to delete this employee?", {
            onClose: (action: any) => {
                if(action === "OK"){
                    const model = this.getOwnerComponent()?.getModel("employeeModel") as JSONModel;
                    const data = model.getData() as any[];

                    const idxToDelete = this.getView()?.getElementBinding("employeeModel")?.getPath().split("/").pop() as unknown as number;

                    data.splice(idxToDelete, 1);

                    model.setData(data);
                    (this.getOwnerComponent() as Component).getRouter().navTo("RouteMain", {}, {}, false);
                }
            }
        })
    }
}