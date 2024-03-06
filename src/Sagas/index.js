import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios';
import _ from 'lodash';

const url = 'https://hd2f4g85l4.execute-api.ap-south-1.amazonaws.com/Stage/';
var isError = false;

function* loginPage(action) {
    if(!_.isEmpty(action.payload)){
        try{
        var data = yield axios({
            method:"GET",
            url: url ,
            params:action.payload,
            headers: { "Content-Type": 'application/json'},
        }).then(response => response,).catch(err=>{
                  console.log(err);
                  isError=true;
              });
            ;
            if(isError){
                yield put({type: "LOAD_LOGIN_FAIL",payload: isError});
                isError=false
            }
            else{
                yield put({ type: "LOAD_LOGIN_SUCCESS", payload: data.data });
            } 
            }
            catch(err){
                console.log(err);
            }
        }
}

function* getProductsData(action) {
    if(!_.isEmpty(action.payload)){
        try{
            var data =yield axios({
                method : "GET",
                url : 'https://pybearnwl1.execute-api.ap-south-1.amazonaws.com/Store/Categorized',
                params : action.payload,
                headers : { "Content-Type": 'application/json'},
            }).then(response => response,).catch(err=>{
                console.log(err);
                isError=true;
            });
          ;
          if(isError){
            yield put({type: "GET_PRODUCTS_DATA_FAIL",payload: isError});
            isError=false
        }
        else{
            yield put({ type: "GET_PRODUCTS_DATA_SUCCESS", payload: data.data });
        } 
        }
        catch(err){
            console.log(err);
        }
    }
}

function* getCartItems(action) {
    if(!_.isEmpty(action.payload)){
        try{
            var data =yield axios({
                method : "GET",
                url : url+'cart',
                params : action.payload,
                headers : { "Content-Type": 'application/json'},
            }).then(response => response,).catch(err=>{
                console.log(err);
                isError=true;
            });
          ;
          if(isError){
            yield put({type: "GET_CART_ITEM_FAIL",payload: isError});
            isError=false
        }
        else{
            yield put({ type: "GET_CART_ITEM_SUCCESS", payload: data.data });
        } 
        }
        catch(err){
            console.log(err);
        }
    }
}

function* deleteCartItem(action) {
    if(!_.isEmpty(action.payload)){
        try{
            var data =yield axios({
                method : "DELETE",
                url : url+'cart',
                params : action.payload,
                headers : { "Content-Type": 'application/json'},
            }).then(response => response,).catch(err=>{
                console.log(err);
                isError=true;
            });
          ;
          if(isError){
            yield put({type: "DELETE_CART_ITEM_FAIL",payload: isError});
            isError=false
        }
        else{
            yield put({ type: "DELETE_CART_ITEM_SUCCESS", payload: data.data });
        } 
        }
        catch(err){
            console.log(err);
        }
    }
}

function* addCartItem(action) {
    if(!_.isEmpty(action.payload)){
        try{
            var data =yield axios({
                method : "POST",
                url : url+'cart',
                data : action.payload.productId,
                params : action.payload.userId,
                headers : { "Content-Type": 'application/json'},
            }).then(response => response,).catch(err=>{
                console.log(err);
                isError=true;
            });
          ;
          if(isError){
            yield put({type: "ADD_CART_ITEM_FAIL",payload: isError});
            isError=false
        }
        else{
            yield put({ type: "ADD_CART_ITEM_SUCCESS", payload: data.data });
        } 
        }
        catch(err){
            console.log(err);
        }
    }
}

function* getUserAddress(action) {
    if(!_.isEmpty(action.payload)){
        let error = {}
        try{
            var data =yield axios({
                method : "GET",
                url : url+'address',
                params : action.payload.userId,
                headers : { "Content-Type": 'application/json'},
            }).then(response => response,).catch(err=>{
                console.log(err);
                error = err
                isError=true;
            });
          ;
          if(isError){
            yield put({type: "GET_USER_ADDRESS_FAIL",payload: error});
            isError=false
        }
        else{
            yield put({ type: "GET_USER_ADDRESS_SUCCESS", payload: data.data });
        } 
        }
        catch(err){
            console.log(err);
        }
    }
}

function* postUserAddress(action) {
    if(!_.isEmpty(action.payload)){
        try{
            var data =yield axios({
                method : "POST",
                url : url+'address',
                data : action.payload.deliveryAddress,
                params : action.payload.userId,
                headers : { "Content-Type": 'application/json'},
            }).then(response => response,).catch(err=>{
                console.log(err);
                isError=true;
            });
          ;
          if(isError){
            yield put({type: "POST_USER_ADDRESS_FAIL",payload: isError});
            isError=false
        }
        else{
            yield put({ type: "POST_USER_ADDRESS_SUCCESS", payload: data.data });
        } 
        }
        catch(err){
            console.log(err);
        }
    }
}

function* postUserOrder(action) {
    if(!_.isEmpty(action.payload)){
        try{
            var data =yield axios({
                method : "POST",
                url : url+'order',
                data : action.payload.data,
                params : action.payload.userId,
                headers : { "Content-Type": 'application/json'},
            }).then(response => response,).catch(err=>{
                console.log(err);
                isError=true;
            });
          ;
          if(isError){
            yield put({type: "POST_USER_ADDRESS_FAIL",payload: isError});
            isError=false
        }
        else{
            console.log(data);
            yield put({ type: "POST_USER_ADDRESS_SUCCESS", payload: data.data });
        } 
        }
        catch(err){
            console.log(err);
        }
    }
}

function* actionWatcher() {
    yield takeLatest('LOAD_LOGIN',loginPage)
    yield takeLatest('GET_PRODUCTS_DATA',getProductsData)
    yield takeLatest('GET_CART_ITEMS',getCartItems)
    yield takeLatest('DELETE_CART_ITEM',deleteCartItem)
    yield takeLatest('ADD_CART_ITEM',addCartItem)
    yield takeLatest('GET_USER_ADDRESS',getUserAddress)
    yield takeLatest('POST_USER_ADDRESS',postUserAddress)
    yield takeLatest('POST_USER_ORDER',postUserOrder)
}

export default function* MainRootSaga() {
    yield all([
        actionWatcher(),
    ]);
}