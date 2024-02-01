import {getTagList} from "@/store/article/reducer";
import {getAllTag} from "@/utils/axios";

export const getTags = ()=>{
    return async dispatch=>{
        const res = await getAllTag();
        let list = res.data.map(item=>{
            return {
                name:item.name,
                id:item._id
            }
        })
        dispatch(getTagList(list))
    }
}
