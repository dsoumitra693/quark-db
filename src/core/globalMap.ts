import HashMap from "./dataStructures/hash";

export default class GlobalMap extends HashMap<string, any> {
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
    
