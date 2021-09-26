import React, { Component } from "react";
import {message} from 'antd';
import '../style/style.css'
import leidian from '../image/leidian.png'
import hua from '../image/hua.png'
import flag from '../image/flag.png'

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
    isClick = false;
    clickNum = 0;

    componentDidMount() {
        this.makeData();
        this.props.onRef(this)
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

    changeStage( stage ){
        let hig = 9, tol = 10;
        if( stage === 'hard' ){
            hig = 15;
            tol = 20
        }
        this.setState( {hig: hig, tol: tol}, () => {
            this.makeData();
        } )
    }

    makeData(){
        let { tol, hig, wid } = this.state;
        let nums = [], data = [], img = [];
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
        console.log( 'startStatus', nums )
        this.setState( { data: nums, img: img, result: 'playing' } )
    }

    onClick( e, index, childIndex, childItem, img, data ){
        // if( e === 0 ){                      // 左键点击
        //     this.onCellClick( index, childIndex, childItem, img )
        // } else if( e === 1 ){               // 中键
        //
        // } else if( e === 2 ){               // 右键
        //
        // }
        this.clickNum++;
        if (this.isClick) {
            return;
        }
        this.isClick = true;
        setTimeout(() => {
            // 超过1次都属于双击
            if (this.clickNum > 1) {
                this.doubleClick( index, childIndex, img );
            } else {
                this.onCellClick( index, childIndex, childItem, img );
            }
            this.clickNum = 0;
            this.isClick = false;
        }, 300);
    }
    showInfo(){
        const { result } = this.state;
        if( result === 'lose' ) {
            message.warning('You Are Lose');
        } else if ( result === 'win' ) {
            message.success('You Are Win!');
        }
    }
    doubleClick( index, childIndex, img ){
        let imgNew = this.clone( img );
        if( imgNew[index][childIndex] === 3 ){
            imgNew[index][childIndex] = 0
        } else if( imgNew[index][childIndex] === 0 ){
            imgNew[index][childIndex] = 3;
        }
        this.setState( { img: imgNew } )
    }
    onCellClick( index, childIndex, childItem, img ){
        let imgNew = this.clone( img );
        const { result } = this.state;
        if( result !== 'playing' ){
            this.showInfo();
            return;
        }
        if( imgNew[index][childIndex] === 3 ) return;
        if( childItem === 1 ){     // 当点击到炸弹
            this.setState( { result: 'lose' }, () => {
                this.showInfo();
            } );
        } else if( childItem === 0 ){   //当没有点击到炸弹， 判断周围是否可以打开
            if( this.totalNum(index, childIndex) !== 0 ){      // 周围有雷，不打开
                imgNew[index][childIndex] = 1;
                this.setState( { img: imgNew }, () => {
                    this.checkWin();
                } )
            } else if( this.totalNum( index, childIndex) === 0 ){   //周围没雷，可以打开
                let imgN = this.makeBlack( imgNew, index, childIndex );
                this.setState({ img: imgN }, () => {
                    this.checkWin();
                } )
            }
        }
    }
    checkWin(){
        const { img, wid, hig, tol } = this.state;
        let total = 0;
        for( let i = 0; i<wid; i++ ){
            for( let j=0; j<hig; j++ ){
                if( img[i][j] !== 0 && img[i][j] !== 3 ) total++;
            }
        }
        if( total === wid*hig - tol ){
            this.setState( { result: 'win' }, () => {
                this.showInfo();
            } );
        }
    }

    makeBlack( img, index, childIndex  ){
        const { data } = this.state;
        let imgNew = this.clone( img );
        for( let i=-1; i<2; i++ ){
            for( let j=-1; j<2; j++ ){
                if( data[ index+i ] && imgNew[ index+i ][ childIndex+j ] === 0 ){
                    if( i === 0 && j === 0 && data[ index ][ childIndex ] === 0 ){
                        imgNew[ index ][ childIndex ] = 2;
                    } else if( data[ index+i ] && data[ index+i ][ childIndex+j ] === 0 && ( this.totalNum( index+i, childIndex+j ) === 0 ) ){
                        imgNew[ index+i ][ childIndex+j ] = 2;
                        imgNew = this.makeBlack( imgNew,index+i, childIndex+j );
                    } else if( data[ index+i ] && data[ index+i ][ childIndex+j ] === 0 && ( this.totalNum( index+i, childIndex+j ) !== 0 ) ){
                        imgNew[ index+i ][ childIndex+j ] = 1;
                    }
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
                                                    color: '#000',
                                                    background: result !== 'playing'?
                                                        (result === 'lose' ? `url(${leidian}) no-repeat 0 0 /100% 100%` : `url(${hua}) no-repeat 0 0 /100% 100%`)
                                                        : (img[index][childIndex] === 1 || img[index][childIndex] === 2 ?
                                                        '#fff' : ( img[index][childIndex] === 0 ? 'rgba(1,1,1, 0.1)' : `url(${flag}) no-repeat 0 0 /100% 100%`)
                                                        ),
                                                } }
                                                onMouseDown={ ( e ) => {
                                                    this.onClick( e.button, index, childIndex, childItem, img, data );
                                                } }
                                    > { result !== 'playing' ? '' :( img[index][childIndex] === 1 ? this.totalNum( index, childIndex ) : '' ) } </div>
                                } )
                            }
                        </div>
                    } )
                }
            </div>
        );
    }
}