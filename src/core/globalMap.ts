import HashMap from "./dataStructures/hash";
import List from "./dataStructures/list";
import Set from "./dataStructures/set";
import SortedSet from "./dataStructures/sortedSet";
import String from "./dataStructures/string";

type GlobalMapValueType = String<any> | List<any> | HashMap | Set<any> | SortedSet<any>;

export default class GlobalMap extends HashMap<string, GlobalMapValueType> {
    private static instance: GlobalMap;

    private constructor() {
        super();
    }

    public static getInstance(): GlobalMap {
        if (!GlobalMap.instance) {
            GlobalMap.instance = new GlobalMap();
        }
        return GlobalMap.instance;
    }
}
    
