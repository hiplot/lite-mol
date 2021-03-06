/*
 * Copyright (c) 2016 - now David Sehnal, licensed under Apache 2.0, See LICENSE file for more info.
 */


namespace LiteMol.Bootstrap.Components.Transform {
    "use strict";

    export interface ActionState {
        controller: Controller<any> | undefined;
    }

    export class Action extends Component<ActionState> {
        private removed(e: Entity.Any) {
            if (!this.latestState.controller) return;
            let l = this.latestState.controller.entity;
            if (l === e) {
                this.setState({ controller: void 0 });
            }
        }

        private added() {
            let sel = this.context.select(this.selector);
            let e = sel[0];
            if (!e) return;
            let c = this.context.transforms.getController(this.transformer, e);
            if (!c) return;
            this.setState({ controller: c });
        }

        constructor(ctx: Context, private selector: Tree.Selector<Entity.Any>, public transformer: Tree.Transformer.Any, public header: string) {
            super(ctx, { controller: void 0 });

            Event.Tree.NodeAdded.getStream(ctx).subscribe(() => this.added());
            Event.Tree.NodeRemoved.getStream(ctx).subscribe(e => this.removed(e.data));            
        }
    }
}