import { useEffect,useState } from "react";
import ItemCollection from "./ItemCollection.js";
import RankingGrid from "./RankingGrid.js";

const RankItems = ({ items, setItems, dataType, imgArr,localStorageKey }) => {

    const [reload, setReload] = useState(false);
    function Reload() {
        setReload(true);
    }
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    function allowDrop(ev) {
        ev.preventDefault();
    }
    function drop(ev) {
        ev.preventDefault();
        const targetItem = ev.target;
        if (targetItem.nodeName === "IMG") {
            return false;
        }
        if (targetItem.childNodes.length === 0) {
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map((item) => (item.id === parseInt(data)) ?
                { ...item, ranking: parseInt(targetItem.id.substring(5)) } : { ...item, ranking: item.ranking });
            setItems(transformedCollection);
        }
    }

    useEffect(() => {
        if (items == null) {
            getDataFromApi();
        }
    }, [dataType]);

    useEffect(() => {
        if (reload === true) {
            getDataFromApi();
        }
    }, [reload]);
    function getDataFromApi() {
        fetch(`item/${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })
    }

    useEffect(() => {
        if (items != null) {
            localStorage.setItem(localStorageKey, JSON.stringify(items));
        }
        setReload(false);
    },[items])

    return (
        (items != null) ?
        <main>
            <RankingGrid items={items} imgArr={imgArr} drag={drag} allowDrop={allowDrop} drop={drop} />
                <ItemCollection drag={drag} items={items} imgArr={imgArr} />
                <button onClick={Reload} style={{ margin:"10px"}}>Reload</button>
            </main>
            : <main>Loading...</main>
    )
}

export default RankItems;