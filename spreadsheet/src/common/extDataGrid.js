import ReactDataGrid from "react-data-grid";

let clicks = [];
let timeout;
class ExtDataGrid extends ReactDataGrid {
    componentDidMount() {
        this._mounted = true;
        // eslint-disable-next-line prefer-destructuring
        this.dataGridComponent = document.getElementsByClassName(
            "react-grid-Viewport"
        )[0];

        window.addEventListener("resize", this.metricsUpdated);
        if (this.props.cellRangeSelection) {
            this.dataGridComponent.addEventListener(
                "mouseup",
                this.clickHandler
            );
            this.dataGridComponent.addEventListener(
                "mousedown",
                this.mouseDownHandler
            );
        }
        this.metricsUpdated();
    }

    componentWillUnmount() {
        this._mounted = false;
        window.removeEventListener("resize", this.metricsUpdated);
        this.dataGridComponent.removeEventListener(
            "mouseup",
            this.clickHandler
        );
        this.dataGridComponent.removeEventListener(
            "mousedown",
            this.mouseDownHandler
        );
    }

    mouseDownHandler = (event) => {
        let editorContainer = document.getElementsByClassName(
            "rdg-editor-container"
        );
        if (editorContainer && editorContainer.length > 0) {
            event.stopPropagation();
        }
    };
    singleClick = () => {
        this.onWindowMouseUp();
    };
    doubleClick = () => {
        console.log("");
    };

    clickHandler = (event) => {
        event.preventDefault();
        clicks.push(new Date().getTime());
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            if (
                clicks.length > 1 &&
                clicks[clicks.length - 1] - clicks[clicks.length - 2] < 250
            ) {
                this.doubleClick();
                clicks = [];
            } else {
                this.singleClick();
                clicks = [];
            }
        }, 250);
    };
}

export default ExtDataGrid;
