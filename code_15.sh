npm run dev
fatal
error: too many writes on closed pipe
goroutine 6 [running]: runtime.throw({0xa2669, 0x1e})
runtime/panic.go
> vite-shadcn@0.0.0 dev
> vite
:1047 +0x3 fp=0x83aed8 sp=0x83aeb0 pc=0x12250003
os.sigpipe()
runtime/os_js.go:144 +0x2 fp=0x83aef0 sp=0x83aed8 pc=0x13b70002
os.epipecheck(...)
os/file_unix.go:224
os.(*File).Write(0x80c020, {0x87e200, 0xe8, 0x100})
os/file.go:183 +0x2d fp=0x83af78 sp=0x83aef0 pc=0x160f002d
main.runService.func1()
github.com/evanw/esbuild/cmd/esbuild/service.go:99 +0x7 fp=0x83afe0 sp=0x83af78 pc=0x1ff30007
runtime.goexit()
runtime/asm_wasm.s:399 +0x1 fp=0x83afe8 sp=0x83afe0 pc=0x14070001
created by main.runService
github.com/evanw/esbuild/cmd/esbuild/service.go:97 +0x1e
goroutine 1 [chan receive]: runtime.gopark(0xbbfa8, 0x834178, 0xe, 0x17, 0x2)
runtime/proc.go:381 +0x28 fp=0x897bd8 sp=0x897bb0 pc=0x124c0028
runtime.chanrecv(0x834120, 0x0, 0x1)
runtime/chan.go:583 +0x7f fp=0x897c60 sp=0x897bd8 pc=0x106d007f
runtime.chanrecv1(0x834120, 0x0)
runtime/chan.go:442 +0x2 fp=0x897c88 sp=0x897c60 pc=0x106b0002
github.com/evanw/esbuild/internal/helpers.(*ThreadSafeWaitGroup).Wait(...)
github.com/evanw/esbuild/internal/helpers/waitgroup.go:36
main.runService.func2()
github.com/evanw/esbuild/cmd/esbuild/service.go:114 +0x8 fp=0x897ca8 sp=0x897c88 pc=0x1ff20008
main.runService(0x1)
github.com/evanw/esbuild/cmd/esbuild/service.go:160 +0x5c fp=0x897df0 sp=0x897ca8 pc=0x1ff0005c
main.main()
github.com/evanw/esbuild/cmd/esbuild/main.go:241 +0xa0 fp=0x897f88 sp=0x897df0 pc=0x1fe900a0
runtime.main()
runtime/proc.go:250 +0x32 fp=0x897fe0 sp=0x897f88 pc=0x12460032
runtime.goexit()
runtime/asm_wasm.s:399 +0x1 fp=0x897fe8 sp=0x897fe0 pc=0x14070001
goroutine 2 [force gc (idle)]: runtime.gopark(0xbc140, 0x3ef840, 0x11, 0x14, 0x1)
runtime/proc.go:381 +0x28 fp=0x828fb8 sp=0x828f90 pc=0x124c0028
runtime.goparkunlock(...)
runtime/proc.go:387
runtime.forcegchelper()
runtime/proc.go:305 +0x1f fp=0x828fe0 sp=0x828fb8 pc=0x1249001f
runtime.goexit()
runtime/asm_wasm.s:399 +0x1 fp=0x828fe8 sp=0x828fe0 pc=0x14070001
created by runtime.init.5
runtime/proc.go:293 +0x2
goroutine 3 [GC sweep wait]: runtime.gopark(0xbc140, 0x3efbc0, 0xc, 0x14, 0x1)
runtime/proc.go:381 +0x28 fp=0x829798 sp=0x829770 pc=0x124c0028
runtime.goparkunlock(...)
runtime/proc.go:387
runtime.bgsweep(0x82e000)
runtime/mgcsweep.go:278 +0xf fp=0x8297d0 sp=0x829798 pc=0x1179000f
runtime.gcenable.func1()
runtime/mgc.go:178 +0x2 fp=0x8297e0 sp=0x8297d0 pc=0x110d0002
runtime.goexit()
runtime/asm_wasm.s:399 +0x1 fp=0x8297e8 sp=0x8297e0 pc=0x14070001
created by runtime.gcenable
runtime/mgc.go:178 +0x8
goroutine 4 [GC scavenge wait]: runtime.gopark(0xbc140, 0x3efe00, 0xd, 0x14, 0x2)
runtime/proc.go:381 +0x28 fp=0x829f80 sp=0x829f58 pc=0x124c0028
runtime.goparkunlock(...)
runtime/proc.go:387
runtime.(*scavengerState).park(0x3efe00)
runtime/mgcscavenge.go:400 +0xd fp=0x829fa8 sp=0x829f80 pc=0x1160000d
runtime.bgscavenge(0x82e000)
runtime/mgcscavenge.go:628 +0x4 fp=0x829fd0 sp=0x829fa8 pc=0x11650004
runtime.gcenable.func2()
runtime/mgc.go:179 +0x2 fp=0x829fe0 sp=0x829fd0 pc=0x110c0002
runtime.goexit()
runtime/asm_wasm.s:399 +0x1 fp=0x829fe8 sp=0x829fe0 pc=0x14070001
created by runtime.gcenable
runtime/mgc.go:179 +0xe
goroutine 5 [finalizer wait]: runtime.gopark(0xbbfe0, 0x40cab0, 0x10, 0x14, 0x1)
runtime/proc.go:381 +0x28 fp=0x828738 sp=0x828710 pc=0x124c0028
runtime.runfinq()
runtime/mfinal.go:193 +0x1f fp=0x8287e0 sp=0x828738 pc=0x1104001f
runtime.goexit()
runtime/asm_wasm.s:399 +0x1 fp=0x8287e8 sp=0x8287e0 pc=0x14070001
created by runtime.createfing
runtime/mfinal.go:163 +0xd
goroutine 7 [waiting]: runtime.gopark(0x0, 0x0, 0x0, 0x0, 0x1)
runtime/proc.go:381 +0x28 fp=0x82af90 sp=0x82af68 pc=0x124c0028
runtime.handleEvent()
runtime/lock_js.go:257 +0x1b fp=0x82afe0 sp=0x82af90 pc=0x10a3001b
runtime.goexit()
runtime/asm_wasm.s:399 +0x1 fp=0x82afe8 sp=0x82afe0 pc=0x14070001
created by runtime.beforeIdle
runtime/lock_js.go:207 +0x1a
goroutine 8 [sleep]: runtime.gopark(0xbc180, 0x832190, 0x13, 0x13, 0x1)
runtime/proc.go:381 +0x28 fp=0x82b768 sp=0x82b740 pc=0x124c0028
time.Sleep(0x3b9aca00)
runtime/time.go:195 +0x1b fp=0x82b7a0 sp=0x82b768 pc=0x13d6001b
main.runService.func3()
github.com/evanw/esbuild/cmd/esbuild/service.go:124 +0x5 fp=0x82b7e0 sp=0x82b7a0 pc=0x1ff10005
runtime.goexit()
runtime/asm_wasm.s:399 +0x1 fp=0x82b7e8 sp=0x82b7e0 pc=0x14070001
created by main.runService
github.com/evanw/esbuild/cmd/esbuild/service.go:122 +0x41
goroutine 9 [semacquire]: runtime.gopark(0xbc140, 0x3f3460, 0x12, 0x19, 0x4)
runtime/proc.go:381 +0x28 fp=0x903868 sp=0x903840 pc=0x124c0028
runtime.goparkunlock(...)
runtime/proc.go:387
runtime.semacquire1(0x9bb888, 0x0, 0x1, 0x0, 0x12)
runtime/sema.go:160 +0x3b fp=0x9038b8 sp=0x903868 pc=0x12e0003b
sync.runtime_Semacquire(0x9bb888)
runtime/sema.go:62 +0x2 fp=0x9038e8 sp=0x9038b8 pc=0x13cb0002
sync.(*WaitGroup).Wait(0x9bb880)
sync/waitgroup.go:116 +0x11 fp=0x903910 sp=0x9038e8 pc=0x14f30011
github.com/evanw/esbuild/internal/bundler.(*scanner).addEntryPoints(0x853680, {0x8e2390, 0x1, 0x1})
github.com/evanw/esbuild/internal/bundler/bundler.go:1854 +0xd9 fp=0x903f58 sp=0x903910 pc=0x1e6400d9
github.com/evanw/esbuild/internal/bundler.ScanBundle(0x0, {0x8bf490, 0x80a4e0, 0x80a4f8, 0x810500, 0x4, 0x8c05a0}, {0x13a3a8, 0x810620}, 0x830660, ...)
github.com/evanw/esbuild/internal/bundler/bundler.go:1365 +0x79 fp=0x904620 sp=0x903f58 pc=0x1e540079
github.com/evanw/esbuild/pkg/api.rebuildImpl({0x830660, {0x0, 0x0, 0x0}, {0x0, 0x0, 0x0}, {0x0, 0x1, 0x2, ...}, ...}, ...)
github.com/evanw/esbuild/pkg/api/api_impl.go:1458 +0x11 fp=0x905788 sp=0x904620 pc=0x1f950011
github.com/evanw/esbuild/pkg/api.(*internalContext).rebuild(0x871400)
github.com/evanw/esbuild/pkg/api/api_impl.go:977 +0xe fp=0x906c48 sp=0x905788 pc=0x1f89000e
github.com/evanw/esbuild/pkg/api.(*internalContext).Rebuild(...)
github.com/evanw/esbuild/pkg/api/api_impl.go:1038
github.com/evanw/esbuild/pkg/api.Build({0x2, 0x4, 0x0, 0x8c0390, 0x1, {0x0, 0x0}, 0x0, 0x0, {0x80a2b8, ...}, ...})
github.com/evanw/esbuild/pkg/api/api.go:385 +0x7 fp=0x9074d8 sp=0x906c48 pc=0x1f720007
main.(*serviceType).handleBuildRequest(0x8c00c0, 0x0, 0x8c01b0)
github.com/evanw/esbuild/cmd/esbuild/service.go:763 +0xd0 fp=0x907f80 sp=0x9074d8 pc=0x201800d0
main.(*serviceType).handleIncomingPacket.func2()
github.com/evanw/esbuild/cmd/esbuild/service.go:235 +0x4 fp=0x907fe0 sp=0x907f80 pc=0x20130004
runtime.goexit()
runtime/asm_wasm.s:399 +0x1 fp=0x907fe8 sp=0x907fe0 pc=0x14070001
created by main.(*serviceType).handleIncomingPacket
github.com/evanw/esbuild/cmd/esbuild/service.go:233 +0x27
goroutine 10 [chan send]: runtime.gopark(0xbbfa8, 0x8341d8, 0xf, 0x16, 0x2)
runtime/proc.go:381 +0x28 fp=0xa5f5f0 sp=0xa5f5c8 pc=0x124c0028
runtime.chansend(0x834180, 0xa5fa48, 0x1, 0x1e550008)
runtime/chan.go:259 +0x59 fp=0xa5f670 sp=0xa5f5f0 pc=0x10640059
runtime.chansend1(0x834180, 0xa5fa48)
runtime/chan.go:145 +0x2 fp=0xa5f6a0 sp=0xa5f670 pc=0x10630002
github.com/evanw/esbuild/internal/bundler.ScanBundle.func2()
github.com/evanw/esbuild/internal/bundler/bundler.go:1302 +0x8 fp=0xa5ffe0 sp=0xa5f6a0 pc=0x1e550008
runtime.goexit()
runtime/asm_wasm.s:399 +0x1 fp=0xa5ffe8 sp=0xa5ffe0 pc=0x14070001
created by github.com/evanw/esbuild/internal/bundler.ScanBundle
github.com/evanw/esbuild/internal/bundler/bundler.go:1300 +0x56
goroutine 11 [chan receive]: runtime.gopark(0xbbfa8, 0x834a18, 0xe, 0x17, 0x2)
runtime/proc.go:381 +0x28 fp=0x85ebb8 sp=0x85eb90 pc=0x124c0028
runtime.chanrecv(0x8349c0, 0x85eca0, 0x1)
runtime/chan.go:583 +0x7f fp=0x85ec40 sp=0x85ebb8 pc=0x106d007f
runtime.chanrecv1(0x8349c0, 0x85eca0)
runtime/chan.go:442 +0x2 fp=0x85ec68 sp=0x85ec40 pc=0x106b0002
main.(*serviceType).sendRequest(0x8c00c0, {0x48840, 0x9bf8f0})
github.com/evanw/esbuild/cmd/esbuild/service.go:192 +0xb fp=0x85ecb8 sp=0x85ec68 pc=0x1ff5000b
main.(*serviceType).convertPlugins.func2.3({{0x89e0c0, 0x1c}, {0x0, 0x0}, {0x93be8, 0x4}, {0x813880, 0xd}, 0x1, {0x0, ...}, ...})
github.com/evanw/esbuild/cmd/esbuild/service.go:985 +0x92 fp=0x85efa0 sp=0x85ecb8 pc=0x20210092
github.com/evanw/esbuild/pkg/api.(*pluginImpl).onResolve.func1({{0x89e0c0, 0x1c}, {0x813880, 0xd}, {0x0, 0x0}, {{0x0, 0x0}, {0x93be8, 0x4}, ...}, ...})
github.com/evanw/esbuild/pkg/api/api_impl.go:1894 +0x20 fp=0x85f320 sp=0x85efa0 pc=0x1fa00020
github.com/evanw/esbuild/internal/bundler.RunOnResolvePlugins({0x8306c0, 0x1, 0x1}, 0x853200, {0x8bf490, 0x80a4e0, 0x80a4f8, 0x810500, 0x4, 0x8c05a0}, ...)
github.com/evanw/esbuild/internal/bundler/bundler.go:939 +0x3e fp=0x85f918 sp=0x85f320 pc=0x1e4f003e
github.com/evanw/esbuild/internal/bundler.(*scanner).addEntryPoints.func1(0x0, {{0x89e0c0, 0x1c}, {0x0, 0x0}, 0x1})
github.com/evanw/esbuild/internal/bundler/bundler.go:1817 +0x1c fp=0x85ffa8 sp=0x85f918 pc=0x1e66001c
github.com/evanw/esbuild/internal/bundler.(*scanner).addEntryPoints.func3()
github.com/evanw/esbuild/internal/bundler/bundler.go:1852 +0x4 fp=0x85ffe0 sp=0x85ffa8 pc=0x1e650004
runtime.goexit()
runtime/asm_wasm.s:399 +0x1 fp=0x85ffe8 sp=0x85ffe0 pc=0x14070001
created by github.com/evanw/esbuild/internal/bundler.(*scanner).addEntryPoints
github.com/evanw/esbuild/internal/bundler/bundler.go:1784 +0xbf
VITE v5.4.20 ready in 19376 ms
➜ Local: http://localhost:5173/
➜ Network: use --host to expose
➜ press h + enter to show help
1:28:56 [vite] hmr update /src/App.tsx, /src/index.css
1:28:56 [vite] hmr update /src/App.tsx, /src/index.css (x2)
1:29:00 [vite] hmr update /src/context/UserContext.tsx, /src/index.css
1:29:00 [vite] hmr invalidate /src/context/UserContext.tsx Could not Fast Refresh ("useUser" export is incompatible). Learn more
at https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports
1:29:00 [vite] page reload src/context/UserContext.tsx
1:29:01 [vite] hmr update /src/context/UserContext.tsx, /src/index.css
1:29:01 [vite] hmr invalidate /src/context/UserContext.tsx Could not Fast Refresh ("useUser" export is incompatible). Learn more
at https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports
1:29:01 [vite] page reload src/context/UserContext.tsx
^C
