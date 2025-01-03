/**
 * Side Filter Config
 */
const FILTER_ORDER = [
  'Process',
  'FunctionalArea',
  //'Module',
  'Ceid'
]
/**
 * Filter Mapping - Pulled manually from COS dash
 * Phase this out for an automatic filter mapping function
 */
/*
const MAPPING = JSON.parse(
  '[{"Process":"1227","FunctionalArea":"Analytical","Ceid":"TFKcu"},{"Process":"1227","FunctionalArea":"Etch","Ceid":"CARco"},{"Process":"1227","FunctionalArea":"Etch","Ceid":"CARcostg"},{"Process":"1227","FunctionalArea":"Etch","Ceid":"GTOcn"},{"Process":"1227","FunctionalArea":"Etch","Ceid":"GTOct"},{"Process":"1227","FunctionalArea":"Litho","Ceid":"CDKcu"},{"Process":"1227","FunctionalArea":"Litho","Ceid":"OMBcu"},{"Process":"1227","FunctionalArea":"Litho","Ceid":"STGcu"},{"Process":"1227","FunctionalArea":"Metro","Ceid":"DORcu"},{"Process":"1227","FunctionalArea":"Metro","Ceid":"FDAca"},{"Process":"1227","FunctionalArea":"Metro","Ceid":"ORLco"},{"Process":"1227","FunctionalArea":"Metro","Ceid":"PCDcp"},{"Process":"1227","FunctionalArea":"Metro","Ceid":"SRKcu"},{"Process":"1227","FunctionalArea":"PC","Ceid":"LSAcp"},{"Process":"1227","FunctionalArea":"Planar","Ceid":"PLIcy"},{"Process":"1227","FunctionalArea":"Planar","Ceid":"PL-PLMck"},{"Process":"1227","FunctionalArea":"ThinFilms","Ceid":"CSBca"},{"Process":"1227","FunctionalArea":"ThinFilms","Ceid":"CSBcastg"},{"Process":"1227","FunctionalArea":"ThinFilms","Ceid":"DVDcr"},{"Process":"1227","FunctionalArea":"ThinFilms","Ceid":"EPNct"},{"Process":"1227","FunctionalArea":"ThinFilms","Ceid":"PLIcystg"},{"Process":"1227","FunctionalArea":"ThinFilms","Ceid":"TF-BE-OX"},{"Process":"1227","FunctionalArea":"ThinFilms","Ceid":"TF-BE-OX-LT"},{"Process":"1227","FunctionalArea":"ThinFilms","Ceid":"XCLcl"},{"Process":"1227","FunctionalArea":"ThinFilms","Ceid":"XCLcu"},{"Process":"1227","FunctionalArea":"WetEtch","Ceid":"DRTcu"},{"Process":"1227","FunctionalArea":"WetEtch","Ceid":"TGRcj"},{"Process":"1227","FunctionalArea":"WetEtch","Ceid":"TGRcx"},{"Process":"1227","FunctionalArea":"ThinFilms","Ceid":"TF-ES"},{"Process":"1274","FunctionalArea":"Analytical","Ceid":"DMTcu"},{"Process":"1274","FunctionalArea":"Analytical","Ceid":"KCDnc"},{"Process":"1274","FunctionalArea":"Analytical","Ceid":"MTKcu"},{"Process":"1274","FunctionalArea":"Analytical","Ceid":"NCDnc"},{"Process":"1274","FunctionalArea":"Analytical","Ceid":"NMTnc"},{"Process":"1274","FunctionalArea":"Analytical","Ceid":"TFKcu"},{"Process":"1274","FunctionalArea":"Analytical","Ceid":"TFKlc"},{"Process":"1274","FunctionalArea":"Analytical","Ceid":"TFKnc"},{"Process":"1274","FunctionalArea":"Analytical","Ceid":"TFRnc"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"EDTde"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"EDTdg"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"EDTfm"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"FOXdi"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"HDRcu"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"HTAdi"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"ROXoo"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"RVIox"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"RVIst"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"RVNsp"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"SAT1a"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"SAT1n"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"SAT1p"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"SAT1t"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"SATct"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"SATts"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"SPAdi"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"SPBdi"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"SPNdf"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"SPQdi"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"STVdi"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"UFRds"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"VFAdi"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"VFCca"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"VFEtw"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"VFGtw"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"VFNdi"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"VFOcm"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"VFOdi"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"VFPdi"},{"Process":"1274","FunctionalArea":"Diffusion","Ceid":"XTAdi"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"APTde"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"BETcu"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"BETnc"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"CARco"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"CARcu"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"D3Asi"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"DEAnf"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"DEAnr"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G4Acs"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G50tl"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G6Pct"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G6Pcv"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G6Tpc"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G6Tpl"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G6Tpy"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G70cb"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G70cu"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G70tb"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G70tl"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G70tm"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G70vg"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G70vm"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G70vn"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G70vs"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G70vt"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G8Tah"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G8Tat"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G8Ttr"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G8Tts"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G8Ttu"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G8Tvg"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G8Tvm"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G8Tvs"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G8Xdp"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G8Xmr"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G8Xpc"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G8Xqn"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G8Xsm"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"GTAbe"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"GTAce"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"GTAcv"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"GTOva"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"GTOvb"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"GTTvs"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"HINcl"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"HINde"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"HINdl"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"I2Emt"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"I2Ene"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"I2Epy"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"OX5cl"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"OX5cn"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"OXScv"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"OXTcr"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"OXTrk"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"P2Tbe"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"P2Tpt"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"P2Ttc"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"P2Ttn"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"P2Tty"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xbt"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xch"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xci"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xck"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xcm"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xct"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xdn"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xes"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xme"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xpv"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xrx"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xsp"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xss"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xtq"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"R3Xtr"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"RCLcr"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"RCLcu"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"RCLde"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"RCLrg"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"T4Oca"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"T4Ocs"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"TAOce"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"TAOcv"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"AFQcu"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"AFQnc"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"AFWcp"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"AFWnp"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"HWPcr"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"LSAcp"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"LSAcs"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"LSAcu"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"LSAnc"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"LSAnp"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"LSAws"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"LSBcp"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"LSBcu"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"LSBnc"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"LSBnp"},{"Process":"1274","FunctionalArea":"FabSupportGroup","Ceid":"LSBws"},{"Process":"1274","FunctionalArea":"Implant","Ceid":"TIMim"},{"Process":"1274","FunctionalArea":"Implant","Ceid":"VIMhc"},{"Process":"1274","FunctionalArea":"Implant","Ceid":"XIMii"},{"Process":"1274","FunctionalArea":"Implant","Ceid":"XIMim"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"CDKcu"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"CDKli"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"MIKab"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"OMBcs"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"OMBct"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"OMBcu"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"OMBli"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"OMBlt"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"OMBns"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"OMGcw"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"OMGnw"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"SAQls"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"SAUli"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"SBHcu"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"SBLcu"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"SBMcu"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"SCCli"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"SLMcu"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"SNElg"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"SNEli"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"SNQck"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"SNQcs"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"SNUck"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TASli"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TAUli"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TBCbc"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TBEbc"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TBEna"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TBFna"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TBHcu"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TBLcu"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TBMcu"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TNEli"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TNGli"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TNKcu"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TNScs"},{"Process":"1274","FunctionalArea":"Lithography","Ceid":"TNScu"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"BPDdm"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"BPDdp"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"BPQdx"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"DORcu"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"DORdm"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"FDAca"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"FDAda"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"FDBdx"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"FDEdt"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"ORLch"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"ORLdg"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"PALcu"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"PALnc"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"PCDcp"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"PCDnc"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"SRCdm"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"SRIdm"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"SRKcx"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"UDCce"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"UDCcu"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"UDCde"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"UDCdx"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"UDLcx"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"UDLdx"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"UDNtm"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"VIBcu"},{"Process":"1274","FunctionalArea":"Metrology","Ceid":"VIBdm"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLHcc"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLHcn"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLIcy"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLIec"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLIin"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLImd"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLIop"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLIpg"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLIps"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLIrp"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLItl"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLMck"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLMcz"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLMgl"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLMnx"},{"Process":"1274","FunctionalArea":"Planar","Ceid":"PLMny"},{"Process":"1274","FunctionalArea":"Regen","Ceid":"PLBcg"},{"Process":"1274","FunctionalArea":"Regen","Ceid":"PLEcg"},{"Process":"1274","FunctionalArea":"Regen","Ceid":"PLEng"},{"Process":"1274","FunctionalArea":"Regen","Ceid":"SSTcg"},{"Process":"1274","FunctionalArea":"Regen","Ceid":"SSTrg"},{"Process":"1274","FunctionalArea":"Regen","Ceid":"SSTxg"},{"Process":"1274","FunctionalArea":"Regen","Ceid":"WRCcr"},{"Process":"1274","FunctionalArea":"Regen","Ceid":"WROrg"},{"Process":"1274","FunctionalArea":"Regen","Ceid":"WRScg"},{"Process":"1274","FunctionalArea":"Regen","Ceid":"WRSrg"},{"Process":"1274","FunctionalArea":"Regen","Ceid":"WRTrg"},{"Process":"1274","FunctionalArea":"SubFab","Ceid":"VSGAag"},{"Process":"1274","FunctionalArea":"SubFab","Ceid":"VSGAam"},{"Process":"1274","FunctionalArea":"SubFab","Ceid":"VSGAct"},{"Process":"1274","FunctionalArea":"SubFab","Ceid":"VSGAda"},{"Process":"1274","FunctionalArea":"SubFab","Ceid":"VSGAeb"},{"Process":"1274","FunctionalArea":"SubFab","Ceid":"VSGAec"},{"Process":"1274","FunctionalArea":"SubFab","Ceid":"VSGAed"},{"Process":"1274","FunctionalArea":"SubFab","Ceid":"VSGPeb"},{"Process":"1274","FunctionalArea":"SubFab","Ceid":"VSGPed"},{"Process":"1274","FunctionalArea":"SubFab","Ceid":"Z-EXCLUDE"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"ALEcu"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"AVDdi"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"AVXdb"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CDOco"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CDOcu"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CDOnc"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CDTci"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CDTkr"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CDTks"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CDTsl"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CSBca"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CSBcf"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CSBcp"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CTIcc"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CTIcu"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CTIcw"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CTIcx"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CVDco"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CVDcs"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CVDgc"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"CVDph"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"DVDco"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"DVDcr"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"DVDnl"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"DVDnn"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"DVDxi"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"EPNct"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"EPNma"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"EPNtn"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"FLOng"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"H7Bcu"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"REKmk"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"REKsk"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"RIObb"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"RIOht"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"RIOnc"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"RIOnt"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"RIOtn"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"RIOwt"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"SPKnc"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"SPUhm"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"SPUst"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"SPUtn"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"STOsd"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"STOsj"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"STOtd"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"TADaa"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"TADro"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"TADss"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"UVSnc"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"WDPbf"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"XCLcl"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"XCLcu"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"XCTnc"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"XDKad"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"XDKcs"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"XDKob"},{"Process":"1274","FunctionalArea":"ThinFilms","Ceid":"XDKta"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"C2Tcd"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"C2Tcn"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"C2Tcs"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"CATch"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"DRTcb"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"DRTcu"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"DRTnb"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"DRTnc"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"ESTwc"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"J4Rwe"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"J4Rwx"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"KSTwa"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"NSTpn"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"NSTwa"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"NSTwn"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"NSTwp"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"SSTeg"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"SSTsg"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"SSTwa"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rcb"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rce"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rcj"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rco"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rcp"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rcr"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rct"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rcx"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rjn"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rne"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rnj"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rnp"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rny"},{"Process":"1274","FunctionalArea":"WetEtch","Ceid":"T4Rsh"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"G6Pcn"},{"Process":"1274","FunctionalArea":"Etch","Ceid":"GTOon"},{"Process":"5053","FunctionalArea":"Analytical","Ceid":"DMTcu"},{"Process":"5053","FunctionalArea":"Analytical","Ceid":"FTMcu"},{"Process":"5053","FunctionalArea":"Analytical","Ceid":"KCDnc"},{"Process":"5053","FunctionalArea":"Analytical","Ceid":"NCDnc"},{"Process":"5053","FunctionalArea":"Analytical","Ceid":"TFKcu"},{"Process":"5053","FunctionalArea":"Analytical","Ceid":"TFRnc"},{"Process":"5053","FunctionalArea":"FabSupportGroup","Ceid":"LSAcs"},{"Process":"5053","FunctionalArea":"FabSupportGroup","Ceid":"LSBws"},{"Process":"5053","FunctionalArea":"Implant","Ceid":"XIMim"},{"Process":"5053","FunctionalArea":"Lithography","Ceid":"OMGmt"},{"Process":"5053","FunctionalArea":"Lithography","Ceid":"SBHli"},{"Process":"5053","FunctionalArea":"Lithography","Ceid":"TBHli"},{"Process":"5053","FunctionalArea":"Metrology","Ceid":"BPDdp"},{"Process":"5053","FunctionalArea":"Metrology","Ceid":"FDAca"},{"Process":"5053","FunctionalArea":"Metrology","Ceid":"FDAda"},{"Process":"5053","FunctionalArea":"Metrology","Ceid":"ORLcw"},{"Process":"5053","FunctionalArea":"Metrology","Ceid":"ORLdt"},{"Process":"5053","FunctionalArea":"Metrology","Ceid":"SRIdm"},{"Process":"5053","FunctionalArea":"Metrology","Ceid":"SRKcx"},{"Process":"5053","FunctionalArea":"Metrology","Ceid":"UDLcx"},{"Process":"5053","FunctionalArea":"Metrology","Ceid":"UDLdx"},{"Process":"5053","FunctionalArea":"ThinFilms","Ceid":"CVDcc"},{"Process":"5053","FunctionalArea":"WetEtch","Ceid":"T4Rcx"},{"Process":"5053","FunctionalArea":"Etch","Ceid":"GTOva"},{"Process":"5053","FunctionalArea":"ThinFilms","Ceid":"EPNct"},{"Process":"5053","FunctionalArea":"WetEtch","Ceid":"ESTsz"},{"Process":"5053","FunctionalArea":"Etch","Ceid":"GTAcq"},{"Process":"5053","FunctionalArea":"Analytical","Ceid":"TFKnc"},{"Process":"5053","FunctionalArea":"Etch","Ceid":"RCLde"},{"Process":"5053","FunctionalArea":"Lithography","Ceid":"CDKcu"},{"Process":"5053","FunctionalArea":"Lithography","Ceid":"CDKli"}]'
)

const removedFromMapping = [
  { Process: '1270', FunctionalArea: 'Analytical', Ceid: 'DMTcu' },
  { Process: '1270', FunctionalArea: 'Analytical', Ceid: 'DMTnc' },
  { Process: '1270', FunctionalArea: 'Analytical', Ceid: 'FTMcu' },
  { Process: '1270', FunctionalArea: 'Analytical', Ceid: 'FTTnc' },
  { Process: '1270', FunctionalArea: 'Analytical', Ceid: 'NMTnc' },
  { Process: '1270', FunctionalArea: 'Analytical', Ceid: 'TFRnc' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'EDTde' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'EDTfn' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'FOXdi' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'RVIox' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'RVIst' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'RVNsp' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'SENdi' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'SPNdf' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'SPQdi' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'UFRdf' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'VFAdi' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'VFBbt' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'VFCca' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'VFEtw' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'VFGtw' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'VFNdi' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'VFOcm' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'VFOdi' },
  { Process: '1270', FunctionalArea: 'Diffusion', Ceid: 'VFPdi' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'ANTpa' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'BCLcu' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'BCLnc' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'CARcb' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'CARcs' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'CARcu' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'HMEcm' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'HMEcu' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'HOPwe' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'I2Efn' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'I2Emt' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'I2Epy' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'ICEbt' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'ICEeu' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'NSEde' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'OXScl' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'OXScn' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'OXScs' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'OXScv' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'OXTcr' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'OXTdm' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'OXThm' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'OXTon' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'OXTrk' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'RCLcr' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'RCLcu' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'RCLde' },
  { Process: '1270', FunctionalArea: 'Etch', Ceid: 'RCLrg' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'AFQcu' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'AFQnc' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'AFWcp' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'AFWnp' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'HWPcr' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'LSAcp' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'LSAcs' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'LSAcu' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'LSAnc' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'LSAnp' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'LSAws' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'LSBcp' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'LSBcu' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'LSBnc' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'LSBws' },
  { Process: '1270', FunctionalArea: 'FabSupportGroup', Ceid: 'Z-EXCLUDE' },
  { Process: '1270', FunctionalArea: 'Implant', Ceid: 'PIAim' },
  { Process: '1270', FunctionalArea: 'Implant', Ceid: 'VIMhc' },
  { Process: '1270', FunctionalArea: 'Implant', Ceid: 'XIMii' },
  { Process: '1270', FunctionalArea: 'Implant', Ceid: 'XIMim' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'CDKcu' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'CDKli' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'DPCdc' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'MIKab' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'OMBct' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'OMBcu' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'OMBli' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'OMBlt' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'OMGnw' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'SARli' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'SBHcu' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'SBHli' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'SLMcu' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'SLMox' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'SNEli' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'SOXli' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'STBcu' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'STGli' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'TARli' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'TBCbc' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'TBEbc' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'TBEna' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'TBHcu' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'TBHli' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'TNEli' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'TNSli' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'TTBcu' },
  { Process: '1270', FunctionalArea: 'Lithography', Ceid: 'TTGli' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'DORcu' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'DORdm' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'FDAct' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'FDAda' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'FDAsd' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'ORLca' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'ORLcm' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'ORLcw' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'ORLdt' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'PALcu' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'SRAcu' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'SRBcu' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'SRBnc' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'UDCcu' },
  { Process: '1270', FunctionalArea: 'Metrology', Ceid: 'UDLdm' },
  { Process: '1270', FunctionalArea: 'Planar', Ceid: 'PLMcn' },
  { Process: '1270', FunctionalArea: 'Planar', Ceid: 'PLMmd' },
  { Process: '1270', FunctionalArea: 'Planar', Ceid: 'PLMps' },
  { Process: '1270', FunctionalArea: 'Planar', Ceid: 'PLMsa' },
  { Process: '1270', FunctionalArea: 'Planar', Ceid: 'PLMsd' },
  { Process: '1270', FunctionalArea: 'Planar', Ceid: 'PLMwd' },
  { Process: '1270', FunctionalArea: 'Regen', Ceid: 'PLEcg' },
  { Process: '1270', FunctionalArea: 'Regen', Ceid: 'PLEng' },
  { Process: '1270', FunctionalArea: 'Regen', Ceid: 'SSTxg' },
  { Process: '1270', FunctionalArea: 'Regen', Ceid: 'WRCcr' },
  { Process: '1270', FunctionalArea: 'Regen', Ceid: 'WROrg' },
  { Process: '1270', FunctionalArea: 'Regen', Ceid: 'WRScg' },
  { Process: '1270', FunctionalArea: 'Regen', Ceid: 'WRSrg' },
  { Process: '1270', FunctionalArea: 'Regen', Ceid: 'WRTrg' },
  { Process: '1270', FunctionalArea: 'SubFab', Ceid: 'VSGAag' },
  { Process: '1270', FunctionalArea: 'SubFab', Ceid: 'VSGAam' },
  { Process: '1270', FunctionalArea: 'SubFab', Ceid: 'VSGAct' },
  { Process: '1270', FunctionalArea: 'SubFab', Ceid: 'VSGAeb' },
  { Process: '1270', FunctionalArea: 'SubFab', Ceid: 'VSGAec' },
  { Process: '1270', FunctionalArea: 'SubFab', Ceid: 'VSGAed' },
  { Process: '1270', FunctionalArea: 'SubFab', Ceid: 'VSGPeb' },
  { Process: '1270', FunctionalArea: 'SubFab', Ceid: 'VSGPed' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'AVDcu' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'AVDdi' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'AVXdb' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'CDOck' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'CDOco' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'CSBca' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'CTIcu' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'CTIcz' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'CVDcc' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'CVDco' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'CVDcs' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'CVDnn' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'CVDph' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'CVDxi' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'EPNct' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'LKLcu' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'SPUtp' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'SPUtt' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'STOsd' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'STOsm' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'TADrf' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'TADrs' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'WDPpn' },
  { Process: '1270', FunctionalArea: 'ThinFilms', Ceid: 'XDKta' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'BECcu' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'C2Tcs' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'C2Tcu' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'CATce' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'CATcx' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'DRTcb' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'DRTcu' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'DRTnb' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'DRTnc' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'ESTwa' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'GSTwa' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'SSTeg' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'SSTsg' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'SSTwa' },
  { Process: '1270', FunctionalArea: 'WetEtch', Ceid: 'T4Rcx' }
]
*/
/**
 * Add a filter to the nav bar
 * @param {string} name header text above select
 * @param {string} key
 */
function addFilter (name, key) {
  // get the form element
  let form = $('#report-filter-form')[0]

  // create title
  let span = create('span', { textContent: name, className: 'form-span' })

  let div = create('div', {}, { style: 'text-align:left; width:160px;' })

  // create select object
  let select = create(
    'select',
    {
      className: 'select-multiple',
      id: key + '-select'
    },
    {
      multiple: 'multiple',
      'data-placeholder': 'Select an option...',
      style: 'min-width: 100px'
    }
  )

  div.append(select)
  // append both to form
  appendChildren(form, [span, div])
}

/**
 * Configure the filters in the nav bar
 * - Add them, wire them, etc...
 */
function filterConfig () {
  let formParent = $('#report-filter-form')[0].parentNode
  let buttonDiv = create(
    'div',
    { id: 'filter-button-parent' },
    { style: 'padding: 20px; text-align:center;' }
  )
  let button = create('button', {
    textContent: 'Apply Filters',
    onclick: COS,
    id: 'filter-apply-button'
  })
  buttonDiv.append(button)

  // get previously used filters
  let chosen = {}
  FILTER_ORDER.forEach(v => {
    chosen[v] = localStorage.getItem(v) === null ? [] : localStorage.getItem(v)
  })

  // add filters but only populate the first one
  addFilter('Process', FILTER_ORDER[0])

  // setup the first filter with data and a change event
  // change handler for subsequent filters will be set in the
  // update filter section
  let f1 = $('#' + FILTER_ORDER[0] + '-select')
  f1.select2({
    data: selectDataFormat(MAPPING, FILTER_ORDER[0], chosen[FILTER_ORDER[0]])
  })
  f1.on('change', event => {
    updateFilter(event, 0)
  })

  // add additional filters
  addFilter('Area Selection', FILTER_ORDER[1])
  //addFilter('Module Selection', FILTER_ORDER[2])
  addFilter('Ceid Selection', FILTER_ORDER[2])

  // loop additional filters and turn them into select2 objects
  for (let i = 1; i < FILTER_ORDER.length; i++) {
    let data = preloadSelect(chosen[FILTER_ORDER[i]])
    $('#' + FILTER_ORDER[i] + '-select').select2({ data: data })
  }
  if (chosen[FILTER_ORDER[0].length > 0]) {
    f1.trigger('change')
  }

  formParent.appendChild(buttonDiv)
}

/**
 * Gets all the selected filters and returns together
 * @returns {*} Dict|Map of all the filter items selected
 */
function getFilterSelections () {
  let results = {}
  FILTER_ORDER.forEach((v, i, a) => {
    results[v] = $('#' + v + '-select')
      .select2('data')
      .map((vv, ii, aa) => {
        return vv.text
      })
  })
  return results
}

/**
 * Formats data to the select2 requirement
 * @param {*} data data to format
 * @param {*} key specific column/key to get from data
 * @returns {Array} an array of data formatted for select2
 */
function selectDataFormat (data, key, chosen) {
  return unique(data, key).map((v, i, a) => {
    return typeof chosen !== 'undefined'
      ? chosen.includes(v)
        ? { id: i.toString(), text: v, selected: true }
        : { id: i.toString(), text: v }
      : { id: i.toString(), text: v }
  })
}

function preloadSelect (data) {
  let results = []
  if (!Array.isArray(data)) {
    let temp = data.split(',')
    data = temp.length > 0 ? temp : [data]
  }
  data.forEach((v, i, a) => {
    results.push({ id: i.toString(), text: v, selected: true })
  })
  return results
}

/**
 * Updates all filters after a change is made on a previous filter
 * @param {*} event select2 event
 * @param {*} id used to determine the order of the filter that the event was triggered from
 */
function updateFilter (event, id) {
  // get full dataset without changing the original
  let dataset = JSON.parse(JSON.stringify(MAPPING))

  // get all previously selected values from all other select2 objects
  let chosen = {}
  for (let i = 0; i < FILTER_ORDER.length; i++) {
    // get filter name
    let fltr = FILTER_ORDER[i]

    // make an array to put values into
    chosen[fltr] = []

    // get data from the select2 object
    chosen[fltr] = $('#' + fltr + '-select')
      .select2('data')
      .map((v, i, a) => {
        return v.text
      })

    // id + 1 and on need to be empty and rebuilt
    if (i > id) {
      $('#' + fltr + '-select')
        .empty()
        .select2()
    }
  }

  // filter the dataset with available known selections
  for (let i = 0; i <= id; i++) {
    // simplify filter variable
    let fltr = FILTER_ORDER[i]

    // see what shows as selected
    //log(`${FILTER_ORDER[i]}\n${chosen[fltr]}`)

    // check to see what filters are applied and filter the dataset
    dataset =
      chosen[fltr].length > 0 ? dataIn(dataset, fltr, chosen[fltr]) : dataset
    //log(dataset)
  }

  /* create a stopping point based on how many fields have data in them
      let max = 0
      FILTER_ORDER.forEach((v, i, a) => {
        max += chosen[v].length > 0 ? 1 : 0
      })
    
      // had to do this because it would bug out when it reached 3 in the next if block
      max -= max === FILTER_ORDER.length ? 1 : 0
      */

  // reinitialize the data with items reselected, if possible for the next filter
  for (let i = id + 1; i < FILTER_ORDER.length; i++) {
    let fltr = FILTER_ORDER[i]
    let selected = $('#' + fltr + '-select')
    let data = []

    // get previous values to filter this dataset by
    let dsfltr = FILTER_ORDER[i - 1]

    // check to see what filters are applied and filter the dataset
    dataset =
      chosen[dsfltr].length > 0
        ? dataIn(dataset, dsfltr, chosen[dsfltr])
        : dataset

    let uniqueVals = unique(dataset, fltr)
    if (uniqueVals.length > 0) {
      data = uniqueVals.map((v, i, a) => {
        return {
          id: i.toString(),
          text: v,
          selected: chosen[fltr].includes(v) ? true : false
        }
      })
    }
    selected.select2({ data: data })
    selected.on('change', event => {
      updateFilter(event, i)
    })
  }

  // store selections in local storage for use when reloading the browser
  FILTER_ORDER.forEach(v => {
    localStorage.setItem(v, chosen[v])
  })
}

function loadFrame () {
  let selections = getFilterSelections()
  selections.site = ['F32']
  selections.indicators = ['Issues', 'E3-Health']
  let args = DOTS_BASE_URL
  Object.keys(selections).forEach(key => {
    if (selections[key].length > 0) {
      switch (key) {
        case 'Module':
          args += '&mod='
          break
        case 'FunctionalArea':
          args += '&fa='
          break
        default:
          args += `&${key.toLowerCase()}=`
          break
      }

      selections[key].forEach((v, i, a) => {
        args += i === a.length - 1 ? v : v + ','
      })
    }
  })
  return args
}
