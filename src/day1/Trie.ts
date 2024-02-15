type TrieNode = {
    isWord: boolean
    children: Map<string, TrieNode>
}

export default class Trie {
    private root: TrieNode

    constructor() {
        this.root = { isWord: false, children: new Map() }
    }

    insert(item: string): void {
        let node = this.root
        for (const c of item) {
            if (!node.children.has(c)) {
                const newNode = { isWord: false, children: new Map() }
                node.children.set(c, newNode)
            }
            node = node.children.get(c) as TrieNode
        }
        node.isWord = true
    }

    delete(item: string): void {
        let node = this.root
        dfsRemove(node, item, 0)

        function dfsRemove(node: TrieNode | undefined, word: string, depth: number): TrieNode | undefined {
            if (!node) return undefined

            if (word.length === depth) {
                if (isEmpty(node)) return undefined
                node.isWord = false
                return node
            }

            const char = word[depth]
            let child = node.children.get(char)
            child = dfsRemove(child, word, depth + 1)
            child ? node.children.set(char, child) : node.children.delete(char)

            if (isEmpty(node) && !node.isWord) return undefined
            return node
        }

        function isEmpty(node: TrieNode): boolean {
            return node.children.size === 0
        }
    }

    find(partial: string): string[] {
        let words: string[] = []
        let node = this.root

        for (const c of partial) {
            if (!node.children.has(c)) return words
            node = node.children.get(c) as TrieNode
        }

        let word = partial
        dfs(node, word, words)
        return words

        // helper
        function dfs(node: TrieNode, word: string, words: string[]) {
            if (node.isWord) words.push(word)

            for (const [char, childNode] of node.children) {
                if (childNode) dfs(childNode, word + char, words)
            }
        }
    }
}

const trie = new Trie();
trie.insert("foo");
trie.insert("fool");
trie.insert("foolish");
trie.insert("bar");

trie.delete('fool')
trie.delete('foolish')

trie.find('fo') //?
trie
// expect(trie.find("fo").sort()).toEqual([
//     "foo",
//     "fool",
//     "foolish",
// ]);
