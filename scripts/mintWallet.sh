#restart devnet :
#curl -X POST http://127.0.0.1:5050/restart -H "Content-Type:application/json"

# for all addresses of predeployed account of devnet : 
#curl -X GET http://127.0.0.1:5050/predeployed_accounts -H "Content-Type:application/json"

# provide ETH to a wallet address :

#Braavos-Brave
#curl -X POST http://127.0.0.1:5050/mint -d '{"address":"0x00f92678a891046ae0789b9eb8dafde2669a6eb1bca493fb7d9b2bdd54171c18","amount":50000000000000000000,"lite":true}' -H "Content-Type:application/json"
#Braavos-Chrome
#curl -X POST http://127.0.0.1:5050/mint -d '{"address":"0x02a4bd957bd8def46287b5dbb9f74c4e5d18745dbbe29da406dbd940edaffc3c","amount":50000000000000000000,"lite":true}' -H "Content-Type:application/json"
#argentX-Chrome
#curl -X POST http://127.0.0.1:5050/mint -d '{"address":"0x04b497639c3348AbF6E5761094c1C8a28616A273598e38Fd5ab41C3d4277c295","amount":50000000000000000000,"lite":true}' -H "Content-Type:application/json"
#argentX-Brave-devnet-account 1
curl -X POST http://127.0.0.1:5050/mint -d '{"address":"0x0592d37DF7702c411BD72b577687A7F7c9759362cDDe76299e7c0865f47a883C","amount":50000000000000000000,"lite":true}' -H "Content-Type:application/json"

#argentX-Brave-devnet-account 1
curl -X POST http://127.0.0.1:5050/mint -d '{"address":"0x02ac57373755fb088b94e4cc9948C945F45e22d1E41768235ED3e95a14346eB1","amount":50000000000000000000,"lite":true}' -H "Content-Type:application/json"

#argentX-Brave-devnet-account 1
curl -X POST http://127.0.0.1:5050/mint -d '{"address":"0x02E3Eb76e5C4EfD86d83DeF28a5BE2c55A933bC0CF45f5854B02484bdaD9D629","amount":50000000000000000000,"lite":true}' -H "Content-Type:application/json"




