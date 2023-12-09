

incluirPostagem_(): void {
    let postType: string
    let today: string
    
    // Input control
    do {
        postType = this.requisitarEntrada(new Messages().msg.inputs.askPostType)
    } while (postType !== "1" && postType !== "2")

    do {
        today = this.requisitarEntrada(new Messages().msg.inputs.askDateAsTutorial)
    } while(!(this.redeSocial.tratarDadosData(today, "-")))
    
    const text: string = this.requisitarEntrada(new Messages().msg.inputs.askPostContent)
    const profileId: number = this.requisitarEntradaNumero(new Messages().msg.inputs.askProfileId)
    
    /*
    On a real application, someone has an account to login
    So the post created is already linked to the post
    But there is no login creation system
    The way to garantee this post has an autor is by passing the author's id
    For security, the author's existence itself must be checked
    This will serve for both kinds of posts (regular and advanced)
    */
    const profileExists: Perfil = this.redeSocial.repPerfis.consultar(profileId)
    
    if (profileExists) {
        // Regular post
        if (postType === "1") {
            const newPost: Postagem = new Postagem(this.redeSocial.repPosts.lastId, text, 0, 0, today, profileExists);
            let previousLength: number = this.redeSocial.repPosts.tamanhoRepositorio()
            this.redeSocial.incluirPostagem(newPost)
            let currenLength: number = this.redeSocial.repPosts.tamanhoRepositorio()
            // It repository grew, this means the post was added, so the update on text file is authorized
            if (previousLength < currenLength) {
                this.redeSocial.repPosts.atualizarUltimoIdPostagem()
                console.log(new Messages().msg.warn)
                console.log(new Messages().msg.success.postCreated)
                this.teclarEnter()
                return
            }
        }
        
        // Advanced Post
        else if (postType === "2") {
            const profileHashtags: string[] = []
            const views: number = this.requisitarEntradaNumero(new Messages().msg.inputs.askPostViewsRange)
            const hashTagsAmount: number = this.requisitarEntradaNumero(new Messages().msg.inputs.askHashtagsAmount)

            // Hashtags being added progressively on the loop (one input for each index)
            for (let i = 0; i < hashTagsAmount; i++) {
                let hashtag: string = this.requisitarEntrada(`Nome da ${i + 1}a hashtag (não incluir #)`)
                profileHashtags.push("#" + hashtag)
            }

            // Creating post instance
            const newPost: PostagemAvancada = new PostagemAvancada(
                this.redeSocial.repPosts.lastId, 
                text, 0, 0, today, profileExists, profileHashtags, views
            )
            
            let previousLength: number = this.redeSocial.repPosts.tamanhoRepositorio()
            this.redeSocial.incluirPostagem(newPost)
            let currentLength: number = this.redeSocial.repPosts.tamanhoRepositorio()
            
            if (previousLength < currentLength) {
                this.redeSocial.repPosts.atualizarUltimoIdPostagem()
                console.log(new Messages().msg.warn)
                console.log(new Messages().msg.success.postCreated)
                this.teclarEnter()
                return
            }
        }
    }
    console.log(new Messages().msg.warn)
    console.log(new Messages().msg.fail.postNotCreated)
}
