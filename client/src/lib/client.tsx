import PocketBase from "pocketbase";

const pb = new PocketBase("https://fair-differ.pockethost.io");
pb.autoCancellation(false);

export default pb;
