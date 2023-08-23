const Item = ({ item, drag, itemImgObj }) => {

    return (
        <div className="unranked-cell">
            <img id={`item-${item.id}`} src={itemImgObj.image}
                style={{ cursor: "pointer" }} draggable="true" onDragStart={drag} alt="" />
        </div>
    )

}
export default Item;