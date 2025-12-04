export interface IDataGeneratorHelper {
    // data generator
    genKey():string
    genNumber(min:number, max:number):number
    genInteger(min:number, max:number):number
    genFloat(min:number, max:number):number
    genWords(min:number, max:number):string
    genWordsArray(min?:number, max?:number,predicate?:(item:string, index:number)=>string):string[]
    genDate():Date
    rand(min: number, max: number): number
}

class DataHelper implements IDataGeneratorHelper {
    private defaultPredicate = (item: string, index: number): string => `${index} - ${item}`
    private words: string[] = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur culpa debitis, dolore enim explicabo fuga id illo laboriosam nesciunt placeat quis quo quos ratione rerum, similique temporibus ullam voluptatum. A adipisci deserunt dolores, ea, ex exercitationem fugit hic id ipsum nesciunt nostrum nulla optio praesentium quaerat quibusdam quo quod vitae voluptate. Autem cupiditate in labore maiores nesciunt nulla, perspiciatis quos similique ullam. Amet aspernatur magnam molestias neque nisi odio odit placeat porro praesentium quaerat, quidem quod repudiandae sed. Consectetur corporis delectus distinctio dolores ducimus esse ex facilis iusto laudantium libero nostrum, odio praesentium quia reiciendis rem repellendus rerum sequi suscipit ullam voluptas? Dignissimos distinctio dolore ea enim hic incidunt laudantium, maxime nesciunt provident quasi quod quos suscipit temporibus, velit voluptas! Amet consectetur libero repudiandae, similique tempora voluptate! Dignissimos exercitationem nulla obcaecati quasi. Assumenda atque autem, blanditiis commodi consequatur cum deserunt dicta ducimus eius eligendi eveniet excepturi exercitationem facilis fuga fugiat harum ipsa iusto laboriosam necessitatibus nobis quidem ratione, saepe ullam, unde veritatis! A aperiam aspernatur beatae dolor dolore earum possimus quam totam ut veritatis. Necessitatibus possimus reiciendis vel. Cupiditate eveniet reiciendis sed! Commodi consequuntur doloribus eligendi fuga fugiat fugit iusto, minima possimus quia repudiandae tempore vitae, voluptas voluptate. Ab accusamus eligendi fuga harum magnam numquam, odit reiciendis? A accusantium alias amet architecto, aspernatur assumenda atque autem cumque cupiditate delectus dolore eaque excepturi facilis fuga fugiat fugit harum hic illum iure labore laboriosam molestiae molestias neque nihil perferendis quisquam voluptas voluptatem! Culpa cum, earum est exercitationem hic modi praesentium? Error esse sapiente sed! Architecto itaque iusto odit vel velit. A alias amet aut autem cum debitis, delectus deserunt dolore dolorem doloribus facilis, inventore ipsam labore maxime molestias nam nemo neque nesciunt officiis ratione similique sunt tenetur totam, velit voluptatum! Accusantium aliquid animi aperiam atque corporis, cumque dolores error esse et eum expedita facere hic ipsum, modi nulla officia perferendis possimus quisquam quod quos reiciendis sapiente sequi sunt tempore, totam unde velit veritatis vitae voluptas voluptatem! Asperiores deserunt dicta doloremque ea ex harum incidunt iusto nulla obcaecati, odio, quae, quasi quidem quos ratione rerum unde veniam vero voluptatum. Amet assumenda doloribus earum excepturi facere magni nemo, perspiciatis quibusdam reiciendis tenetur. Beatae consequuntur corporis eligendi ipsa modi nam natus officia! Amet ea eveniet ex minima porro sunt tempore. Accusamus cum delectus dolore, dolorum ducimus eos est explicabo fuga hic illo impedit ipsam, laborum laudantium perspiciatis praesentium quaerat quia, rem sit suscipit veniam? Adipisci animi corporis culpa delectus deleniti dignissimos dolore dolorem dolores facilis illo incidunt itaque iusto maiores maxime necessitatibus nesciunt nihil nulla omnis pariatur quisquam repellat similique sit sunt ullam, ut veritatis voluptates, voluptatum? A commodi harum inventore minus, nemo, perferendis praesentium quasi quod, quos recusandae reiciendis voluptatem. A commodi cupiditate deleniti dolore dolorum fugiat in inventore iusto numquam obcaecati? Dolor doloremque eius eligendi, laborum necessitatibus omnis soluta sunt tempore vero voluptates? Accusantium aperiam facere labore neque officia omnis quaerat quidem tempore, ut voluptatum! Accusantium consectetur deserunt eaque enim id maxime quia? Adipisci aliquid amet commodi consectetur cum enim explicabo harum illum incidunt iste itaque laborum molestiae nisi nulla perferendis placeat, quas quasi, recusandae temporibus vitae. Adipisci asperiores commodi dolorum eius ex fugiat harum illum maiores nesciunt nobis nostrum odio placeat quidem quisquam reiciendis totam, voluptate voluptates? Accusantium aliquid ducimus enim facilis, maxime natus nostrum nulla odio quaerat totam ullam ut. A, accusantium alias aliquid at cum eos esse impedit labore magnam, magni modi perferendis quis repellendus ullam ut velit voluptatem. Ab aliquam aperiam asperiores aspernatur beatae consequatur, eos est et ex facere fuga id magnam minus molestias nemo, optio qui quis, quod ullam vel! A accusantium aliquid amet architecto autem commodi consectetur corporis doloremque doloribus ea ex excepturi id impedit natus non odio officiis quaerat quam, quia quod repellat repellendus saepe totam ullam vitae! Ab assumenda delectus deleniti dolore doloribus ducimus eius eligendi esse est facilis iste itaque labore magnam magni maxime minima neque nesciunt obcaecati odit perspiciatis porro quaerat quam quasi quia quibusdam quo quod repudiandae sequi similique suscipit tempora tenetur ullam ut vero vitae voluptatem, voluptates. Accusamus accusantium aliquid aut commodi ea illum nisi vitae? Consequuntur cupiditate delectus ea eligendi hic iste molestias nam nulla, obcaecati voluptatibus. Aliquid architecto aspernatur commodi consequatur cumque dolore doloremque doloribus, dolorum explicabo ipsum itaque labore magni minima natus obcaecati odio possimus qui quo ratione repellendus rerum similique tenetur ullam ut vel veritatis voluptas voluptatum. Ab aliquid, atque corporis delectus deserunt dolore ducimus ea exercitationem fuga id iusto mollitia nesciunt nulla numquam perferendis quaerat sequi similique ut veritatis vero? Consectetur eligendi eos placeat repudiandae? Accusamus accusantium commodi consequatur dolorum error eveniet exercitationem illum in, minima necessitatibus nulla perferendis quam qui repellat rerum sunt tempore unde voluptatibus? Aliquid assumenda beatae consectetur, consequatur cum delectus distinctio doloremque dolorum ea error fugit harum illum inventore ipsa ipsam ipsum iste minus nesciunt placeat quidem repellat reprehenderit sed sequi, suscipit ullam ut veniam voluptatem? Aperiam asperiores atque consequuntur corporis delectus dicta fugit hic incidunt iure laudantium libero magnam minima modi molestias nihil odio optio, quaerat quibusdam quos recusandae reiciendis soluta veniam voluptas! Dicta dignissimos distinctio eveniet excepturi libero natus optio qui quibusdam ullam ut. Aspernatur corporis error ex, facere impedit ipsa nisi non ratione similique veniam. Amet aut delectus ducimus eligendi enim eveniet exercitationem ipsam magnam natus officiis pariatur porro, quae repellendus sunt unde? Accusantium aliquid amet animi aspernatur consequatur corporis cupiditate debitis ducimus est ex exercitationem harum ipsam magnam modi, molestiae mollitia neque nesciunt nobis odit officiis, pariatur perspiciatis provident quaerat quis quo quod rem repellat repellendus, sapiente sequi sunt suscipit temporibus totam ut vel veniam vero! Ab accusamus at, atque culpa debitis dolorem eius harum itaque, modi molestias necessitatibus officia quia quisquam recusandae saepe sed tenetur ullam unde velit voluptatum. Ab cupiditate delectus iusto quaerat qui quibusdam recusandae saepe sit ullam veritatis? Alias asperiores beatae distinctio ex fuga id ipsam labore laborum laudantium magni, minus non obcaecati perspiciatis, quia reprehenderit similique vero! Amet, architecto, at cupiditate deserunt doloribus enim esse harum minus mollitia nam nihil porro quaerat reprehenderit repudiandae sed sequi voluptatum! Aperiam earum nulla odit.".split(' ')

    rand(min: number, max: number): number {
        return min + (Math.random()*(max-min))
    }
    /*********************************************************************************************************
     * data generator
     */
    genDate():Date {
        return new Date(
            this.rand(2010,2025),
            this.rand(1,12),
            this.rand(1,31),
        )
    }

    genInteger(min: number, max: number): number {
        return Math.trunc(this.genNumber(min,max))
    }
    genFloat(min: number, max: number): number {
        return this.genNumber(min,max)
    }
    genWordsArray(min:number=10, max:number=100, predicate: (item: string, index: number) => string=this.defaultPredicate): string[] {
        const N = this.genInteger(min,max)
        const res=[]
        Math.random()
        for(let i=0; i<N; i++)
            res.push(predicate(this.genWords(1,2),1+i))
        return res
    }
    genKey(): string {
        return Math.random().toString(36).substring(2)
    }
    genNumber(min: number, max: number): number {
        return min+(Math.random()*((max+1)-min))
    }
    genWords(min: number=1, max: number=5): string {
        const N = this.genInteger(min,max)
        const len=this.words.length-1
        const res=[]
        for(let i=0; i<N; i++)
            res.push(this.words[this.genInteger(0,len)])
        return res.join(' ')
    }
}

export const dataHelper: IDataGeneratorHelper = new DataHelper()
