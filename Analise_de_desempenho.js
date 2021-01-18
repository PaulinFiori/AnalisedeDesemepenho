var Y = 0;
var U = 0;
var N = 0;
var M = 0;
var K = 0;
var B = 0;

//Fatorial variaval global.

function fatorial(n) {
    let fat;
    for (fat = 1; n > 1; n = n - 1) {
        fat = fat * n;
    }

    return fat;
}

//M/M/1
function P0_1(ro)
{
    return 1 - ro;
}

function Pn_1(ro,n)
{
    return (1 - ro) * (ro**n); 
}

function ro_1(y,u)
{
    return y / u;
}

function utilizacao_1(y,u)
{
    return y / u;
}

//Número médio de requisições no Sistema
function En_1(ro)
{
    return ro / (1 - ro);
}

//Probabilidade de ter n ou mais requisições no sistema:
function P_1(ro,n)
{
    return ro ** n;
}
//Tempo médio de resposta para uma requisição: 
function Es_1(u,ro)
{
    return 1 / (u * (1 - ro));
}

//Tempo médio de espera na fila de uma requisição
function Ew_1(u,ro)
{
    return 1 / (u * (1 - ro));
}

//Número médio de requisições na fila
function Enw_1(ro)
{
    return (ro**2) / (1 - ro);
}

//M/M/m - 2
function somatoria_2(m, ro)
{
    let result = 0;
    for (let n = 0; n < m-1; n++) {
        let aux;
        aux = ((m * ro) ** n) / fatorial(n);
        result += aux;
    }
    return result;
}

function ro_2(y,m,u) {
    if (y > m) {
        return y / (m * u);
    } 
    
    else if(y < m){
        return y / u;
    }
}

function po_2(m,ro,n)
{  
    return 1/ ((m*ro)**m) / (((fatorial(m)) * (1 - ro)) + (somatoria_2(m,ro)) * (((m*ro)**n) / (fatorial(n))));   
}

function pn_2(m,ro,n)
{
    var pn = 0;
    if(n <= m)
    {
        pn = (((m * ro**n) / fatorial(n)) * po_2(m,ro,n));
    }

    else if(n >= m)
    {
        pn = (((ro**n) * (m ** m)) / fatorial(M)) * po_2(m,ro,n);
    }

    return pn;
}

function C_earling_2(m, n, ro)
{
    return po_2(m,ro,n) * (((m * ro)** m) / (fatorial(m)) * (1 - ro));
}

//Número médio de requisições em espera
function enw_2(m, n, ro)
{
    return (ro * C_earling_2(m, n, ro)) / (1 - ro);
}

//Número esperado de requisições em atendimento
function ens_2(m,ro)
{
    return m * ro;
}

//Número de requisições no sistema
function en_2(m,n,ro)
{
    return enw_2(m,n,ro) + ens_2(m,ro);
}

function utilizacao_2(ro)
{
    return ro;
}

//Tempo médio de resposta
function es_2(y,m,n,ro)
{
    return en_2(m,n,ro) / y;
}

//Tempo médio de espera na fila
function ew_2(y,m,n,ro)
{
    return enw_2(m,n,ro) / y;
}

//M/M/(Infinitos) - 3

//Quando chega um novo cliente no sistema. taxa de serviço é aumentado também

//Probabilidade de n requisições no sistema (Pn)
function PnInfinito_3(ro, n)
{
    return ((ro ** n) / fatorial(n)) * po_2(1, n, ro);
}

function U_3(n,u){ //taxa de serviço é aumentado cada vez que entra n clientes
    
    var Total_de_taxa_de_servico = u*n;
    return Total_de_taxa_de_servico;
}

//Cálculo do "ro"
function RoInfinito_3(y, u)
{
    if (y > 1) {
        return y / u;
    } else {
        return 0;
    }
}

//Número médio de clientes no sistema
function En_3(y,u)
{
    return y/u;
}

//Tempo médio de resposta = taxa de serviço
function Es_3(u)
{
    return 1/u;
}

//M/M/1/B -- 4

function Y_4(y,n,b){ //verificação da taxa de chegada
    if (n<b){
        return y;
    } else if (n >= b){
        return 0;
    }
}

function Ro_4(y, u) {
    if (y > 1) {
        return y / u;
    } else {
        return 0;
    }
}

function utilizacao_4(ro, pb)
{
    return (ro*(1-pb));
}

function po_4(ro, b){ // po = probabilidade de o sistema conter nenhum usuarios
    var pn = 1-ro;
    if (pn > 0){
        return pn;
    }
    else if (pn >= b){
        return 0;
    }
    else if (pn == 0){
        return 0;
    }
} 

function pb_4(ro, b) //pb é a probabilidade de o sistema estar totalmente cheio. Sistema sempre cheio (p < infinto)
{
    let pb = ((1-ro)/(1-Math.pow(ro, b+1)))*Math.pow(ro, b);
    return pb;
}

function pn_4(usuarios, ro, b) //pn = probabilidade de n usuarios no sistema
{
    if (usuarios > b)
    {
        return 0;
    } 
    else 
    {
        return ((1-ro)/1-Math.pow(ro,(b+1))*Math.pow(ro,usuarios));
    }
}

function Yi_4(y,pb)
{
    let yi = y*(1-pb);
    return yi;
}

function taxa_de_perda_4(y, pb){
    let perda = y*pb;
    return perda;
}

function En_4(ro, b){ //En = numero media de usuarios no sistema
    let En = (ro/(1-ro))-(((b+1)*Math.pow(ro,b+1))/(1-Math.pow(ro,b+1)));
    return En;
}

function Enw_4(ro, b){ // Enw = numero media de usuarios na fila
    let Enw = (ro/(1-ro))-((1+b*Math.pow(ro,b))/(1-Math.pow(ro,b+1)));
    return Enw;
}

function Es_4(En, y, pb){ // Es = tempo de resposta
    let Es = En/(y*(1-pb));
    return Es;
}

function Ew_4(Enw, y, pb){ //Ew = tempo de espera
    let Ew = Enw/(y*(1-pb));
    return Ew;
}


//M/M/m/B - 5

//chamada de funções
function Y_5(y,n,b){ //verificação da taxa de chegada
    if (n<b){
        return y;
    } else if (n >= b){
        return 0;
    }
}

function Ro_5(y, u, m) {
    if (y > 1) {
        return (y / (m*u));
    } else {
        return 0;
    }
}

function utilizacao_5(ro, pb)
{
    return (ro*(1-pb));
}

function po_5(ro, b, m){ // po = probabilidade de o sistema conter nenhum usuarios

    return 1/(1+((1-Math.pow(ro,(b-m+1))*Math.pow((m*ro),m)))/(fatorial(m)*(1-ro))+(soma_5(m, ro))); 

} 

function pb_5(ro, b) //pb é a probabilidade de o sistema estar totalmente cheio. Sistema sempre cheio (p < infinto)
{
    var pb = ((1-ro)/(1-Math.pow(ro, (b+1))))*Math.pow(ro, b);
    return pb;
}

function soma_5(m, ro) {
    let result = 0;
    for (let n = 0; n < m-1; n++) {
        let aux;
        aux = ((m * ro) ** n) / fatorial(n);
        result += aux;
    }
    return result;
}

function pn_5(n, y, u, b, m, po) //pn = probabilidade de n usuarios no sistema
{
    if (n<m)
    {
        return (Math.pow((y/u), n)*(1/fatorial(n))*po);
    } 
    else if (m <=n && n <= b)
    {
        return ((Math.pow(m,m)/fatorial(m))*(Math.pow((y/u),n))*po);
    }
}

function Yi_5(y,pb)
{
    let yi = y*(1-pb);
    return yi;
}

function taxa_de_perda_5(y, pb){
    let perda = y*pb;
    return perda;
}

function En_5(b, pn) { //En = numero media de usuarios no sistema
    let result = 0;
    for (let n = 1; n < b; n++) {
        let aux;
        aux = ((n*pn));
        result += aux;
    }
    return result;
}

function Enw_5(b, m, pn){ // Enw = numero media de usuarios na fila
    let result = 0;
    for (let n = 1; n < b; n++) {
        let aux;
        aux = ((n-m)*pn);
        result += aux;
    }
    return result;
}

function Es_5(En, y, pb){ // Es = tempo de resposta
    let Es = En/(y*(1-pb));
    return Es;
}

function Ew_5(Enw, y, pb){ //Ew = tempo de espera
    let Ew = Enw/(y*(1-pb));
    return Ew;
}

//M/M/1/K - 6

//lambda do K
function Y_6(y, k, n){
    if (0 <= n && n <= k){
        return y*(K-n);
    }
    else if ( n > k ){
        return 0;
    }
}

// ro 
function ro_6(y,u){
    return y/u;
}

// probabilidade de exisitir cliente no sistema

// pegar e armazenar o lambda k e colocar como y 
function pn_6(k, y, u, n, po){
    if (0 <= k && n <= k){
        var t = k-n;
        return Math.pow(y/u, n) * (fatorial(k)/(fatorial(t))*po);
    } else if (n > k){
        return 0;
    }
}

function soma_6(k, y, u) {
    let result = 0;
    for (let n = 0; n < k; n++) {
        let aux;
        aux = ((y/u)**n);
        result += aux;
    }
    return result;
}

// probabilidade de não existir ninguem no sistema
function po_6(y, k, u, n){
    return 1/(soma_6(k, y, u)*((fatorial(k))/(fatorial(k-n))));        
}

function utilizacao_6(k, ro, En){
    return ro*(k-En);
}

//no. media de usuarios na fila
function Enw_6(k, y, u, po){
    return k-((y-u)/y)*(1-po);    
}

//media de usuarios no sistema
function En_6(Enw, po){
    return Enw+(1-po);
}

//tempo media de espera na fila
function Ew_6(Enw, y, k, En){
    return Enw/(y*(k-En));
}

// tempo media de respostas 
function Es_6(Ew, u){
    return Ew+(1/u);
}

//Taxa Efetiva de chegada 
function Yi_6(u, po){
    return u*(1-po);
}

//M/M/(infintos)/K - 7
function un_7(n,u)
{
    return n * u;
}
//Intensidade de tráfego
function p_7(k,y,u)
{
    return (k * y) / (1 + (y / u));
}

//Número médio de clientes no sistema
function en_7(k,y,u)
{
    return (k * (y / u)) / (1 + (y / u));
}

//Menu
function Escolhas()
{
    console.log("\nEscolha uma Opção:");
    console.log("\n1 - M/M/1");
    console.log("\n2 - M/M/m");
    console.log("\n3 - M/M/(Infinitos)");
    console.log("\n4 - M/M/1/B");
    console.log("\n5 - M/M/m/B");
    console.log("\n6 - M/M/1/K");
    console.log("\n7 - M/M/(infintos)/K");
    var op = prompt("Opção: ");

    return op;
}

function Print()
{
    var opcao = Escolhas();
    switch(opcao) {
        case '1':
            console.log("\nInsira os dados!");
            Y = prompt("\nY: ");
            U = prompt("\nU: ");
            N = prompt("\nN: ");
            M = 1;

            let Ro1 = ro_1(Y,U);
            console.log("\n\n---M/M/1---"); // 1
            console.log("\nPO: " + P0_1(Ro1));
            console.log("\nPn: " + Pn_1(Ro1,N));
            console.log("\nRo: " + ro_1(Y,U));
            console.log("\nUtilização: " + utilizacao_1(Y,U));
            console.log("\nE[n]: " + En_1(Ro1));
            console.log("\nP: " + P_1(Ro1,N));
            console.log("\nE[s]: " + Es_1(U,Ro1));
            console.log("\nE[w]: " + Ew_1(U,Ro1));
            console.log("\nE[nw]: " + Enw_1(Ro1));
            restart();
            break;
        
        case '2':
            console.log("\nInsira os dados!");
            Y = prompt("\nY: ");
            U = prompt("\nU: ");
            N = prompt("\nN: ");
            M = prompt("\nM: ");

            let Ro2 = ro_2(Y,M,U);
            console.log("\n\n---M/M/m---"); // 2
            console.log("\nPO: " + po_2(M,Ro2,N));
            console.log("\nPn: " + pn_2(M,Ro2,N));
            console.log("\nRo: " + ro_2(Y,M, U));
            console.log("\nC: " + C_earling_2(M,Ro2,N));
            console.log("\nE[nw]: " + enw_2(M,N,Ro2));
            console.log("\nE[ns]: " + ens_2(M,Ro2));
            console.log("\nE[n]: " + en_2(M,N,Ro2));
            console.log("\nUtilização: " + utilizacao_2(Ro2));
            console.log("\nE[s]: " + es_2(Y,M,N,Ro2));
            console.log("\nE[w]: " + ew_2(Y,M,N,Ro2));
            restart();
            break;

        case '3':
            console.log("\nInsira os dados!");
            Y = prompt("\nY: ");
            U = prompt("\nU: ");
            N = prompt("\nN: ");
            ro = RoInfinito_3(Y,U,N);

            console.log("\n\n---M/M/(Infinitos)---"); // 3
            console.log("\nPn: " + PnInfinito_3(ro,N));
            console.log("\nTaxa de serviço: " + U_3(N,U));
            console.log("\nRo: " + RoInfinito_3(Y,U,N));
            console.log("\nE[n]: " + En_3(Y,U));
            console.log("\nE[s]: " + Es_3(U));
            restart();
            break;

        case '4':
            console.log("\nInsira os dados!");
            Y = prompt("\nY: ");
            U = prompt("\nU: ");
            N = prompt("\nN: ");
            M = 1;
            B = prompt("\nB: ");

            let ro4 = Ro_4(Y,U);
            let pb4 = pb_4(ro4, B);
            let En4 = En_4(ro4,B);
            let Enw4 = Enw_4(ro4, B);
            console.log("\n\n---M/M/1/B---"); // 4
            console.log("\nY: " + Y_4(Y,N,B));
            console.log("\nRo: " + ro4);
            console.log("\nUtilização: " + utilizacao_4(ro4, pb4));
            console.log("\nP0: " + po_4(ro4,B));
            console.log("\nPb: " + pb4);
            console.log("\nPn: " + pn_4(N, ro4, B));
            console.log("\nTaxa efetiva de chegada: " + Yi_4(Y, pb4));
            console.log("\nTaxa de perda: " + taxa_de_perda_4(Y, pb4));
            console.log("\nE[n]: " + En4);
            console.log("\nE[nw]: " + Enw4);
            console.log("\nE[s]: " + Es_4(En4, Y, pb4));
            console.log("\nE[w]: " + Ew_4(Enw4, Y, pb4));
            restart();
            break;

        case '5':
            console.log("\nInsira os dados!");
            Y = prompt("\nY: ");
            U = prompt("\nU: ");
            N = prompt("\nN: ");
            M = prompt("\nM: ");;
            B = prompt("\nB: ");

            let ro5 = Ro_5(Y, U, M);
            let po5 = po_5(ro5, B, M); 
            let pn5 = pn_5(N, Y, U, B, M, po5);
            let pb5 = pb_5(ro5, B);
            let En5 = En_5(B, pn5);
            let Enw5 = Enw_5(B, M, pn5);
            console.log("\n\n--M/M/m/B---"); // 5
            console.log("\nY: " + Y_5(Y,N,B));
            console.log("\nRo: " + ro5);
            console.log("\nUtilização: " + utilizacao_5(ro5, pb5));
            console.log("\nP0: " + po5);
            console.log("\nPb: " + pb5);
            console.log("\nPn: " + pn5);
            console.log("\nTaxa efetiva de chegada: " + Yi_5(Y, pb5));
            console.log("\nTaxa de perda: " + taxa_de_perda_5(Y, pb5));
            console.log("\nE[n]: " + En5);
            console.log("\nE[nw]: " + Enw5);
            console.log("\nE[s]: " + Es_5(En5, Y, pb5));
            console.log("\nE[w]: " + Ew_5(Enw5, Y, pb5));
            restart();
            break;

        case '6':
            console.log("\nInsira os dados!");
            Y = prompt("\nY: ");
            U = prompt("\nU: ");
            N = prompt("\nN: ");
            M = 1;
            K = prompt("\nK: ");

            let ro6 = ro_6(Y,U);
            let po6 = po_6(Y, K, U, N);
            let Enw6 = Enw_6(K, Y, U, po6);
            let En6 = En_6(Enw6, po6);
            let Ew6 = Ew_6(Enw6, Y, K, En6);
            console.log("\n\n---M/M/1/K---"); // 6
            console.log("\nY: " + Y_6(Y,K,N));
            console.log("\nRo: " + ro6);
            console.log("\nUtilização: " + utilizacao_6(K, ro6, En6));
            console.log("\nP0: " + po6);
            console.log("\nPn: " + pn_6(Y, K, U, N, po6));
            console.log("\nTaxa efetiva de chegada: " + Yi_6(U, po6));
            console.log("\nE[n]: " + En6);
            console.log("\nE[nw]: " + Enw6);
            console.log("\nE[s]: " + Es_6(Ew6, U));
            console.log("\nE[w]: " + Ew6);
            restart();
            break;

        case '7':
            console.log("\nInsira os dados!");
            Y = prompt("\nY: ");
            U = prompt("\nU: ");
            N = prompt("\nN: ");
            K = prompt("\nK: ");

            console.log("\n\n---M/M/(infintos)/K---"); // 7
            console.log("\nUn: " + un_7(N,U));
            console.log("\nIntensidade de tráfico: " + p_7(K,Y,U));
            console.log("\nE[n]: " + en_7(K,Y,U));
            restart();
            break;
        
        default:
            console.log("\n\nOpção Inválida!");
            Print();
            
    }
}

function restart()
{
    console.log("\n\nDeseja fazer outra fila? (S/N)\n");
    var r = prompt("Escolha: ");

    if(r == 'S' || r == "s") Print();
    else if(r == 'N' || r == "n") console.log("\n\nFinalizando...");
    else {
        console.log("\n\nDigite por favor, um S ou N");
        restart();
    }
}

Print();