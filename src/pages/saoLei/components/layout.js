import React, { Component } from "react";
import '../style/style.css'

export default class boxMain extends Component {
    constructor(props) {
        super( props );
        this.state = {
            wid: 9,
            hig: 9,
            tol: 10,
            data: [],
            img: [],        //  0：初始状态 1：点击后显示数字状态， 2： 空白状态（点击后空白周围）
            result: 'playing',
        };
    }

    componentDidMount() {
        this.makeData();
    }

    clone( obj ){
        let buf;
        if( obj instanceof Array){
            buf = [];
            let i = obj.length;
            while( i-- ){
                buf[i] = this.clone( obj[i] );
            }
            return buf;
        } else if( obj instanceof Object){
            buf = {};
            for( let k in obj ){
                buf[k] = this.clone(obj[k]);
            }
            return buf;
        } else{
            return obj;
        }
    }

    makeData(){
        let { data, tol, hig, wid } = this.state;
        let nums = [];
        let img = [];
        for( let i=0; i<( wid * hig ); i++ ){
            data.push( 0 );
        }
        for( let j=0; j<tol; j++ ){
            let a = Math.floor( Math.random() * wid * hig );
            if( data[a] === 1 ){
                j--;
            }else{
                data[a] = 1;
            }
        }
        data.forEach( (item, index) => {
            const page = Math.floor( index/wid );
            if( !nums[page] || !img[page]){
                nums[page] = [];
                img[page] = [];
            }
            nums[page].push( item );
            img[page].push(0);
        } );
        this.setState( { data: nums, img: img } )
    }

    onClick( e, index, childIndex, childItem, img, data ){
        if( e === 0 ){                      // 左键点击
            this.onCellClick( index, childIndex, childItem, img )
        } else if( e === 1 ){               // 中键

        } else if( e === 2 ){               // 右键

        }
    }

    onCellClick( index, childIndex, childItem, img ){
        let imgNew = this.clone( img );
        const { data } = this.state;
        if( childItem === 1 ){           // 当点击到炸弹
            this.setState( { result: 'lose' } );
        } else if( childItem === 0 ){   //当没有点击到炸弹， 判断周围是否可以打开
            console.log( 222, this.totalNum(index, childIndex) )
            if( this.totalNum(index, childIndex) !== 0 ){      // 周围有雷，不打开
                imgNew[index][childIndex] = 1;
                this.setState( { img: imgNew } )
            } else if( this.totalNum( index, childIndex) === 0 ){   //周围没雷，可以打开
                let imgN = this.makeBlack( imgNew, index, childIndex, data );
                console.log( 111, imgN, imgNew )
                this.setState({ img: imgN })
            }
        }
    }

    makeBlack( img, index, childIndex, data  ){
        let imgNew = this.clone( img );
        for( let i=-1; i<2; i++ ){
            for( let j=-1; j<2; j++ ){
                if( data[ index+i ] && data[ index+i ][ childIndex+j ] && img[index+i][childIndex+j] !== 0){
                } else if( i === 0 && j === 0 ){
                    imgNew[ index+i ][ index+j ] = 2;
                } else if( data[ index+i ] && data[ index+i ][ childIndex+j ] && this.totalNum( index+i, childIndex+j ) === 0 ){
                    imgNew = this.makeBlack( imgNew,index+i, childIndex+j, data );
                } else if( data[ index+i ] && data[ index+i ][ childIndex+j ] && this.totalNum( index+i, childIndex+j ) !== 0 ){
                    imgNew[ index+i ][ index+j ] = 2;
                }
            }
        }
        return imgNew;
    }

    totalNum( index, childIndex ){
        const { data } = this.state;
        let a = 0;
        for( let i = -1; i<2; i++ ){
            for( let j=-1; j<2; j++ ){
                if( i === 0 && j === 0 ){
                } else if( data[ index+i ] && data[ index+i ][ childIndex+j ] ){
                    a += data[ index+i ][ childIndex+j ];
                }
            }
        }
        return a;
    }

    render() {
        const { data, img, result } = this.state;
        if (!data) return false;
        console.log( 99, data )
        return (
            <div style={ { display: 'table' } } >
                {
                    data.map( ( item, index ) => {
                        return <div key={ index } style={ { display: 'table-row' } }>
                            {
                                item.map( ( childItem, childIndex ) => {
                                    return <div key={ childIndex }
                                                style={ {
                                                    display: 'table-cell',
                                                    width: '30px',
                                                    height: '30px',
                                                    border: '3px solid #FFF',
                                                    textAlign: 'center',
                                                    color: '#fff',
                                                    background: img[index][childIndex] === 1 || img[index][childIndex] === 2 ? '#fff' : 'rgba(1,1,1, 0.1)'
                                                } }
                                                onMouseDown={ ( e ) => {
                                                    this.onClick( e.button, index, childIndex, childItem, img, data );
                                                } }
                                    > { result === 'lose' ? 'lose' :( img[index][childIndex] === 1 ? this.totalNum( index, childIndex ) : '' ) } </div>
                                } )
                            }
                        </div>
                    } )
                }
            </div>
        );
    }
}